// @ts-nocheck
// supabase/functions/api-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!PROXY_TOKEN) {
    return new Response(JSON.stringify({ error: "Proxy token not configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { action, ...params } = body;
    console.log("api-handler invoked, action:", action);

    if (action === "ai-search") {
      const { origin, destination, dates, guests } = params;
      const prompt = `Eres un experto en viajes de esquí. El usuario busca un viaje de esquí con estos datos:
- Saliendo de: ${origin || "cualquier ciudad"}
- Destino deseado: ${destination || "cualquier destino"}
- Fechas: ${dates || "flexibles"}
- Huéspedes: ${guests || "2 adultos"}

Responde en JSON con un array de 3-4 recomendaciones. Cada recomendación debe tener:
{
  "resort": "nombre del resort",
  "country": "país",
  "description": "descripción breve de 2 líneas",
  "price_estimate": "precio estimado en USD por persona",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "skill_level": "principiante/intermedio/avanzado/todos",
  "best_for": "familias/parejas/aventureros/grupos"
}

Responde SOLO con el JSON array, sin texto adicional.`;

      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-proxy-token": PROXY_TOKEN,
        },
        body: JSON.stringify({
          provider: "openai",
          endpoint: "/v1/chat/completions",
          payload: {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          },
        }),
      });

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "[]";
      let results;
      try {
        const cleaned = content.replace(/
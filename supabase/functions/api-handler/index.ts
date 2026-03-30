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
    return new Response(JSON.stringify({ error: "Proxy not configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { action, ...params } = body;
    console.log("api-handler invoked, action:", action);

    if (action === "ai-search") {
      const { query } = params;
      const prompt = `Eres un experto en viajes de esquí. El usuario busca: "${query}". Responde en JSON con un array de 3 recomendaciones de resorts de esquí. Cada una: { "resort": "nombre", "country": "país", "description": "2 líneas en español", "price_estimate": "$X,XXX USD", "highlights": ["a","b","c"], "skill_level": "todos/principiante/intermedio/avanzado", "best_for": "familias/parejas/aventureros", "image_query": "ski resort keyword for photo" }. SOLO JSON array.`;

      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-proxy-token": PROXY_TOKEN },
        body: JSON.stringify({
          provider: "openai",
          endpoint: "/v1/chat/completions",
          payload: { model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], temperature: 0.7 },
        }),
      });

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "[]";
      let results = [];
      try {
        results = JSON.parse(content.replace(/
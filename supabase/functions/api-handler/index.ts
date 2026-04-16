// @ts-nocheck
// supabase/functions/api-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://holaski-2.valinor.studio",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // ── CORS preflight MUST be first — before any env var checks ──────────
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  const HOTELBEDS_API_KEY = Deno.env.get("HOTELBEDS_API_KEY");
  const HOTELBEDS_SECRET = Deno.env.get("HOTELBEDS_SECRET");
  const VALINOR_PROXY_URL = Deno.env.get("VALINOR_PROXY_URL");
  const VALINOR_PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!HOTELBEDS_API_KEY || !HOTELBEDS_SECRET) {
    return new Response(
      JSON.stringify({ error: "Hotelbeds credentials not configured." }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!VALINOR_PROXY_URL || !VALINOR_PROXY_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Valinor proxy not configured." }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const { action } = body;
  console.log("api-handler invoked, action:", action);

  try {
    // ── HOTELBEDS: Search Hotels ──────────────────────────────────────────
    if (action === "search-hotels") {
      const { destination, checkIn, checkOut, adults, children } = body as {
        destination: string;
        checkIn: string;
        checkOut: string;
        adults: number;
        children: number;
      };

      if (!destination || !checkIn || !checkOut) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: destination, checkIn, checkOut" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const msgBuffer = new TextEncoder().encode(HOTELBEDS_API_KEY + HOTELBEDS_SECRET + timestamp);
      const keyBuffer = new TextEncoder().encode(HOTELBEDS_SECRET);
      const cryptoKey = await crypto.subtle.importKey(
        "raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
      );
      const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgBuffer);
      const signature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      const params = new URLSearchParams({
        stay: `${checkIn}:${checkOut}`,
        occupancies: `${adults}:${children ?? 0}`,
        keywords: destination,
        fields: "all",
        language: "ENG",
        from: "1",
        to: "10",
      });

      const hbRes = await fetch(
        `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?${params}`,
        {
          headers: {
            "Api-key": HOTELBEDS_API_KEY,
            "X-Signature": signature,
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
          },
          signal: AbortSignal.timeout(15000),
        }
      );

      const hbData = await hbRes.json();

      if (!hbRes.ok) {
        console.error("Hotelbeds error:", hbData);
        return new Response(
          JSON.stringify({ error: "Hotelbeds API error", details: hbData, fallback: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ hotels: hbData.hotels ?? [], total: hbData.total ?? 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── OPENAI: Build Package ─────────────────────────────────────────────
    if (action === "build-package") {
      const { hotel, checkIn, checkOut, adults, children, destination } = body as {
        hotel: Record<string, unknown>;
        checkIn: string;
        checkOut: string;
        adults: number;
        children: number;
        destination: string;
      };

      if (!hotel || !checkIn || !checkOut) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: hotel, checkIn, checkOut" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const nights = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      );

      const prompt = `Eres un agente de viajes especializado en esquí. 
Crea un paquete completo de viaje en español con estos datos:

Destino: ${destination}
Hotel: ${JSON.stringify(hotel)}
Check-in: ${checkIn}, Check-out: ${checkOut} (${nights} noches)
Pasajeros: ${adults} adultos, ${children} niños

El paquete DEBE incluir en formato JSON:
{
  "titulo": "nombre del paquete",
  "resumen": "descripción corta atractiva",
  "hotel": {
    "nombre": "...",
    "categoria": "X estrellas",
    "precio_noche_mxn": 0,
    "precio_total_hotel_mxn": 0
  },
  "ski_pass": {
    "descripcion": "...",
    "precio_por_persona_mxn": 0,
    "precio_total_mxn": 0,
    "incluye": ["lista de lo que incluye"]
  },
  "traslados": {
    "descripcion": "...",
    "precio_total_mxn": 0,
    "tipo": "privado/compartido"
  },
  "total_paquete_mxn": 0,
  "precio_por_persona_mxn": 0,
  "itinerario": [
    { "dia": 1, "titulo": "...", "actividades": ["..."] }
  ],
  "incluye": ["lista de lo incluido"],
  "no_incluye": ["lista de lo no incluido"],
  "consejos": ["tips útiles para este destino"]
}

Usa precios realistas en MXN para ${new Date().getFullYear()}. Solo responde con el JSON, sin texto adicional.`;

      const aiRes = await fetch(`${VALINOR_PROXY_URL}`, {
        method: "POST",
        headers: {
          "x-proxy-token": VALINOR_PROXY_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "openai",
          endpoint: "/v1/chat/completions",
          payload: {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 2000,
          },
        }),
        signal: AbortSignal.timeout(30000),
      });

      const aiData = await aiRes.json();
      const content = aiData.choices?.[0]?.message?.content ?? "";

      let packageData: Record<string, unknown>;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        packageData = JSON.parse(jsonMatch ? jsonMatch[0] : content);
      } catch {
        return new Response(
          JSON.stringify({ error: "Failed to parse AI response", raw: content }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ package: packageData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Contact Form ──────────────────────────────────────────────────────
    if (action === "send-contact") {
      const { name, email, message } = body as { name: string; email: string; message: string };

      const res = await fetch(`${VALINOR_PROXY_URL}`, {
        method: "POST",
        headers: { "x-proxy-token": VALINOR_PROXY_TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "resend",
          endpoint: "/emails",
          payload: {
            from: "HolaSki <onboarding@resend.dev>",
            to: ["delivered@resend.dev"],
            subject: `Nuevo contacto: ${name}`,
            html: `<p><strong>${name}</strong> (${email}) escribió:</p><p>${message}</p>`,
          },
        }),
        signal: AbortSignal.timeout(10000),
      });

      const data = await res.json();
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("api-handler error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
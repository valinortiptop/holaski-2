// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const VALINOR_PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const VALINOR_PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!VALINOR_PROXY_TOKEN) {
    return new Response(JSON.stringify({ error: "Proxy token not configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case "places-search": {
        const { query } = body;
        const params = new URLSearchParams({ input: query, inputtype: "textquery", fields: "place_id,name,geometry" });
        return await proxyCall("google", `/maps/api/place/findplacefromtext/json?${params.toString()}`, "GET");
      }

      case "place-details": {
        const { place_id } = body;
        const params = new URLSearchParams({
          place_id,
          fields: "name,formatted_address,geometry,rating,user_ratings_total,photos,reviews"
        });
        return await proxyCall("google", `/maps/api/place/details/json?${params.toString()}`, "GET");
      }

      case "geocode": {
        const { address } = body;
        const params = new URLSearchParams({ address });
        return await proxyCall("google", `/maps/api/geocode/json?${params.toString()}`, "GET");
      }

      case "send-lead-notification": {
        const { leadData } = body;
        return await proxyCall("resend", "/emails", "POST", {
          from: "HolaSki <noreply@holaski.com>",
          to: ["hola@holaski.com"],
          subject: `Nuevo Lead: ${leadData?.first_name || 'Sin nombre'}`,
          html: `<h2>Nuevo lead recibido</h2><pre>${JSON.stringify(leadData, null, 2)}</pre>`
        });
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  async function proxyCall(provider: string, endpoint: string, method: string, payload: any = {}) {
    const res = await fetch(VALINOR_PROXY_URL, {
      method: "POST",
      headers: { "x-proxy-token": VALINOR_PROXY_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ provider, endpoint, method, payload })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
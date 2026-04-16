// @ts-nocheck
\s*/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("generate-package error:", (err as Error).message);
    return {
      resort_name: params.destination,
      hotel: { name: "Hotel Valle Nevado", description: "Ski-in/ski-out premium", stars: 4 },
      itinerary: [
        { day: 1, activity: "Llegada y check-in", suggestion: "Descansa y aclimata" },
        { day: 2, activity: "Clases + pistas verdes", suggestion: "Empieza suave" },
        { day: 3, activity: "Pistas azules", suggestion: "Sube intensidad" },
      ],
      cost_breakdown: { hotel: 5800, ski_pass: 3200, equipment: 1500, total_per_person_usd: 10500 },
    };
  }
}

// ── Action router ──
const handlers: Record<string, (params: Record<string, unknown>, proxyUrl: string, proxyToken: string) => Promise<unknown>> = {
  "search-hotels": async (params) => handleSearchHotels(params),
  "generate-package": handleGeneratePackage,
};

// ── Thin orchestrator ──
serve(async (req) => {
  console.log("api-handler request:", req.method, "origin:", req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    console.log("api-handler action:", action);

    const proxyUrl = Deno.env.get("VALINOR_PROXY_URL") ?? "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
    const proxyToken = Deno.env.get("VALINOR_PROXY_TOKEN");
    if (!proxyToken) {
      return new Response(JSON.stringify({ error: "Proxy not configured" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const handler = handlers[action];
    if (!handler) {
      return new Response(JSON.stringify({ error: "Unknown action: " + action }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await handler(params, proxyUrl, proxyToken);
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("api-handler fatal:", (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
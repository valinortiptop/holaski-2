// @ts-nocheck
\s*/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    clearTimeout(timeout);
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

// ── Ping for diagnostics ──
async function handlePing(): Promise<unknown> {
  return { ok: true, time: new Date().toISOString() };
}

// ── Handler registry ──
const handlers: Record<
  string,
  (p: Record<string, unknown>, u: string, t: string) => Promise<unknown>
> = {
  "search-hotels": handleSearchHotels,
  "generate-package": handleGeneratePackage,
  "ping": handlePing,
};

// ── Thin orchestrator ──
// CRITICAL: OPTIONS MUST return 200 before ANY other logic can throw.
serve(async (req: Request) => {
  // 1. PREFLIGHT — absolute first priority, no deps, cannot fail
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // 2. Only POST is accepted for actions
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "method_not_allowed" }),
      { status: 405, headers: jsonHeaders },
    );
  }

  // 3. Parse body safely
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "invalid_json" }),
      { status: 400, headers: jsonHeaders },
    );
  }

  const action = String(body.action ?? "");
  const params = { ...body };
  delete (params as Record<string, unknown>).action;

  console.log("api-handler:", action);

  // 4. Env validation (AFTER preflight, so CORS works even if misconfigured)
  const proxyUrl =
    Deno.env.get("VALINOR_PROXY_URL") ??
    "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const proxyToken = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!proxyToken && action !== "ping") {
    return new Response(
      JSON.stringify({ error: "proxy_not_configured" }),
      { status: 503, headers: jsonHeaders },
    );
  }

  // 5. Route to handler
  const handler = handlers[action];
  if (!handler) {
    return new Response(
      JSON.stringify({ error: "unknown_action", action }),
      { status: 400, headers: jsonHeaders },
    );
  }

  try {
    const data = await handler(params, proxyUrl, proxyToken ?? "");
    return new Response(JSON.stringify(data), { headers: jsonHeaders });
  } catch (err) {
    console.error("handler fatal:", action, (err as Error).message);
    return new Response(
      JSON.stringify({ error: "handler_failed", message: (err as Error).message }),
      { status: 500, headers: jsonHeaders },
    );
  }
});
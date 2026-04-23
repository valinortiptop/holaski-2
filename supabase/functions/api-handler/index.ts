// @ts-nocheck
// supabase/functions/api-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ── CORS headers — ALWAYS returned, including on errors ──
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-proxy-token",
  "Access-Control-Max-Age": "86400",
};

const jsonResp = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });

const errResp = (msg: string, status = 400, extra: Record<string, unknown> = {}) =>
  new Response(JSON.stringify({ error: msg, ...extra }), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });

serve(async (req: Request) => {
  // ── Must handle OPTIONS first, before ANY other logic ──
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  console.log("api-handler invoked:", req.method, req.url);

  if (req.method !== "POST") {
    return errResp("method_not_allowed", 405);
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return errResp("invalid_json_body", 400);
  }

  const action = String(body.action ?? "");
  console.log("action:", action);

  if (action === "ping") {
    return jsonResp({ ok: true, ts: new Date().toISOString() });
  }

  // ── Read env vars INSIDE handler (never at module scope) ──
  const proxyUrl = Deno.env.get("VALINOR_PROXY_URL") ??
    "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const proxyToken = Deno.env.get("VALINOR_PROXY_TOKEN") ?? "";

  if (!proxyToken) {
    console.error("VALINOR_PROXY_TOKEN is not set");
    return errResp("proxy_not_configured: VALINOR_PROXY_TOKEN missing", 503);
  }

  try {
    switch (action) {
      case "search-hotels":   return jsonResp(await searchHotels(body, proxyUrl, proxyToken));
      case "hotel-details":   return jsonResp(await hotelDetails(body, proxyUrl, proxyToken));
      case "check-rates":     return jsonResp(await checkRates(body, proxyUrl, proxyToken));
      case "generate-package":return jsonResp(await generatePackage(body, proxyUrl, proxyToken));
      case "send-contact":    return jsonResp(await sendContact(body, proxyUrl, proxyToken));
      default:
        return errResp(`unknown_action: ${action}`, 400);
    }
  } catch (e) {
    const msg = (e as Error).message ?? "unknown_error";
    console.error(`[${action}] threw:`, msg);
    return errResp(msg, 500, { action, detail: msg });
  }
});

// ── Shared proxy caller ──────────────────────────────────────────
async function callProxy(
  proxyUrl: string,
  token: string,
  req: {
    provider: string;
    path?: string;
    method?: string;
    query?: Record<string, unknown>;
    body?: Record<string, unknown>;
  },
  timeoutMs = 25000,
): Promise<any> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);

  try {
    console.log(`[proxy] → ${req.provider} ${req.method ?? "POST"} ${req.path}`);
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": token,
      },
      body: JSON.stringify(req),
      signal: ac.signal,
    });
    clearTimeout(timer);

    const text = await res.text();
    console.log(`[proxy] ← ${req.provider} status=${res.status} bytes=${text.length}`);

    if (!res.ok) {
      const snippet = text.slice(0, 600);
      if (res.status === 404 && /integration|provider|not.*found/i.test(text)) {
        throw new Error(
          `hotelbeds_not_registered — Hotelbeds is not in Valinor integrations_registry. ` +
          `Admin must open /admin/integrations and register provider "hotelbeds" (auth_type=signature). ` +
          `Raw: ${snippet}`
        );
      }
      if (res.status === 401 || res.status === 403) {
        throw new Error(`proxy_auth_failed (${res.status}): ${snippet}`);
      }
      throw new Error(`proxy_error_${res.status}: ${snippet}`);
    }

    try { return JSON.parse(text); }
    catch { return { raw: text }; }

  } catch (e) {
    clearTimeout(timer);
    if ((e as Error).name === "AbortError") throw new Error(`proxy_timeout_${timeoutMs}ms`);
    throw e;
  }
}

// ── Handlers ─────────────────────────────────────────────────────

async function searchHotels(p: Record<string, unknown>, proxyUrl: string, token: string) {
  const {
    destinationCode, checkIn, checkOut,
    adults = 2, children = 0, rooms = 1,
    currency = "MXN", language = "CAS",
  } = p as Record<string, any>;

  if (!destinationCode) throw new Error("destinationCode_required");
  if (!checkIn || !checkOut) throw new Error("dates_required (YYYY-MM-DD)");

  const hbBody = {
    stay: { checkIn, checkOut },
    occupancies: [{ rooms: Number(rooms), adults: Number(adults), children: Number(children) }],
    destination: { code: destinationCode },
    currency,
    language,
  };

  console.log("[hotelbeds] search body:", JSON.stringify(hbBody));

  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: "/hotel-api/1.0/hotels",
    method: "POST",
    body: hbBody,
  });

  const hotelsRaw: any[] = data?.hotels?.hotels ?? data?.hotels ?? [];
  const total: number = data?.hotels?.total ?? hotelsRaw.length;

  if (!Array.isArray(hotelsRaw)) {
    throw new Error(`unexpected_response: ${JSON.stringify(data).slice(0, 300)}`);
  }

  return {
    hotels: hotelsRaw.map((h: any) => ({
      code: h.code,
      name: h.name,
      categoryName: h.categoryName ?? "",
      destinationName: h.destinationName ?? "",
      zoneName: h.zoneName ?? "",
      latitude: h.latitude ?? null,
      longitude: h.longitude ?? null,
      currency: h.currency ?? currency,
      minRate: Number(h.minRate ?? 0),
      maxRate: Number(h.maxRate ?? 0),
      rooms: h.rooms ?? [],
    })),
    total,
    checkIn,
    checkOut,
    source: "hotelbeds_live",
  };
}

async function hotelDetails(p: Record<string, unknown>, proxyUrl: string, token: string) {
  const { code, language = "CAS" } = p as Record<string, any>;
  if (!code) throw new Error("code_required");
  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: `/hotel-content-api/1.0/hotels/${code}/details`,
    method: "GET",
    query: { language, useSecondaryLanguage: "false" },
  });
  return data?.hotel ?? data;
}

async function checkRates(p: Record<string, unknown>, proxyUrl: string, token: string) {
  const { rateKey } = p as Record<string, any>;
  if (!rateKey) throw new Error("rateKey_required");
  return await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: "/hotel-api/1.0/checkrates",
    method: "POST",
    body: { rooms: [{ rateKey }] },
  });
}

async function generatePackage(p: Record<string, unknown>, proxyUrl: string, token: string) {
  const prompt = `Genera un paquete de esquí en JSON puro (sin markdown) para:
Destino: ${p.destination}, Fechas: ${p.dates}, Viajeros: ${p.travelers}, Nivel: ${p.level}, Presupuesto: ${p.budget}

Devuelve EXACTAMENTE este JSON (precios en MXN):
{"resort_name":"...","hotel":{"name":"...","description":"...","stars":4},"itinerary":[{"day":1,"activity":"...","suggestion":"..."}],"cost_breakdown":{"hotel":0,"ski_pass":0,"equipment":0,"total_per_person_usd":0}}`;

  try {
    const data = await callProxy(proxyUrl, token, {
      provider: "gemini",
      path: "/v1beta/openai/chat/completions",
      method: "POST",
      body: {
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
      },
    }, 30000);
    const raw: string = data?.choices?.[0]?.message?.content ?? "{}";
    const clean = raw.replace(/
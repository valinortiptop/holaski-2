// @ts-nocheck
// supabase/functions/api-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};
const JSON_HEADERS = { ...CORS, "Content-Type": "application/json" };

const ok = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const err = (msg: string, status = 400, extra: Record<string, unknown> = {}) =>
  new Response(JSON.stringify({ error: msg, ...extra }), { status, headers: JSON_HEADERS });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: CORS });
  if (req.method !== "POST") return err("method_not_allowed", 405);

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return err("invalid_json", 400);
  }

  const action = String(body.action ?? "");
  console.log("api-handler invoked, action:", action);

  if (action === "ping") return ok({ ok: true, ts: new Date().toISOString() });

  const proxyUrl =
    Deno.env.get("VALINOR_PROXY_URL") ??
    "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const proxyToken = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!proxyToken) {
    console.error("VALINOR_PROXY_TOKEN not set");
    return err("proxy_not_configured", 503);
  }

  const handlers: Record<string, (p: Record<string, unknown>) => Promise<unknown>> = {
    "search-hotels": (p) => searchHotels(p, proxyUrl, proxyToken),
    "hotel-details": (p) => hotelDetails(p, proxyUrl, proxyToken),
    "check-rates": (p) => checkRates(p, proxyUrl, proxyToken),
    "generate-package": (p) => generatePackage(p, proxyUrl, proxyToken),
    "send-contact": (p) => sendContact(p, proxyUrl, proxyToken),
  };

  const handler = handlers[action];
  if (!handler) return err(`unknown_action: ${action}`, 400);

  try {
    const result = await handler(body);
    return ok(result);
  } catch (e) {
    const msg = (e as Error).message;
    const stack = (e as Error).stack;
    console.error(`[${action}] error:`, msg, stack);
    return err(msg, 500, { action, detail: msg });
  }
});

// ────────────────────────────────────────────────────────────────
// Proxy caller — uses Valinor api-proxy v2 contract:
// { provider, path, method, query?, body? }
// ────────────────────────────────────────────────────────────────

async function callProxy(
  proxyUrl: string,
  token: string,
  request: {
    provider: string;
    path?: string;
    endpoint?: string;
    method?: string;
    query?: Record<string, unknown>;
    body?: Record<string, unknown>;
    payload?: Record<string, unknown>;
  },
  timeoutMs = 25000,
): Promise<any> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  const started = Date.now();

  try {
    console.log(`[proxy] → ${request.provider} ${request.method ?? "POST"} ${request.path ?? request.endpoint}`);
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": token },
      body: JSON.stringify(request),
      signal: ac.signal,
    });
    clearTimeout(t);
    const text = await res.text();
    const ms = Date.now() - started;
    console.log(`[proxy] ← ${request.provider} status=${res.status} ${ms}ms bytes=${text.length}`);

    if (!res.ok) {
      const snippet = text.slice(0, 500);
      if (res.status === 404 && /integration|provider|not.*registered/i.test(text)) {
        throw new Error(
          `hotelbeds_not_registered: Hotelbeds is not registered in Valinor integrations_registry. Open /admin/integrations and register provider 'hotelbeds' with auth_type='signature'. Raw: ${snippet}`,
        );
      }
      if (res.status === 401 || res.status === 403) {
        throw new Error(`proxy_auth_failed (${res.status}): ${snippet}`);
      }
      throw new Error(`proxy_${res.status}: ${snippet}`);
    }

    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  } catch (e) {
    clearTimeout(t);
    if ((e as Error).name === "AbortError") throw new Error("proxy_timeout_25s");
    throw e;
  }
}

// ────────────────────────────────────────────────────────────────
// Hotelbeds handlers
// ────────────────────────────────────────────────────────────────

async function searchHotels(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  const {
    destinationCode,
    checkIn,
    checkOut,
    adults = 2,
    children = 0,
    rooms = 1,
    currency = "MXN",
    language = "CAS",
  } = p as {
    destinationCode?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    currency?: string;
    language?: string;
  };

  if (!destinationCode) throw new Error("destinationCode_required (e.g. 'MEN' for Mendoza, 'PMI' for Palma)");
  if (!checkIn || !checkOut) throw new Error("dates_required (format YYYY-MM-DD)");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(checkIn)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(checkOut))) {
    throw new Error(`invalid_date_format: checkIn=${checkIn}, checkOut=${checkOut}. Must be YYYY-MM-DD.`);
  }

  const hbBody = {
    stay: { checkIn, checkOut },
    occupancies: [{ rooms, adults, children: Number(children) || 0 }],
    destination: { code: destinationCode },
    currency,
    language,
  };

  console.log("[hotelbeds] search payload:", JSON.stringify(hbBody));

  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: "/hotel-api/1.0/hotels",
    method: "POST",
    body: hbBody,
  });

  const hotelsRaw = data?.hotels?.hotels ?? data?.hotels ?? [];
  const total = data?.hotels?.total ?? (Array.isArray(hotelsRaw) ? hotelsRaw.length : 0);

  console.log(`[hotelbeds] search ok: total=${total}, returned=${hotelsRaw.length}`);

  if (!Array.isArray(hotelsRaw)) {
    throw new Error(`unexpected_response_shape: ${JSON.stringify(data).slice(0, 300)}`);
  }

  return {
    hotels: hotelsRaw.map((h: any) => ({
      code: h.code,
      name: h.name,
      categoryName: h.categoryName,
      destinationName: h.destinationName,
      zoneName: h.zoneName,
      latitude: h.latitude,
      longitude: h.longitude,
      currency: h.currency,
      minRate: Number(h.minRate ?? 0),
      maxRate: Number(h.maxRate ?? 0),
      rooms: h.rooms ?? [],
    })),
    total,
    checkIn: data?.hotels?.checkIn ?? checkIn,
    checkOut: data?.hotels?.checkOut ?? checkOut,
    source: "hotelbeds_live",
  };
}

async function hotelDetails(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  const { code, language = "CAS" } = p as { code?: string; language?: string };
  if (!code) throw new Error("code_required");

  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: `/hotel-content-api/1.0/hotels/${code}/details`,
    method: "GET",
    query: { language, useSecondaryLanguage: "false" },
  });
  return data?.hotel ?? data;
}

async function checkRates(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  const { rateKey } = p as { rateKey?: string };
  if (!rateKey) throw new Error("rateKey_required");

  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: "/hotel-api/1.0/checkrates",
    method: "POST",
    body: { rooms: [{ rateKey }] },
  });
  return data;
}

// ────────────────────────────────────────────────────────────────
// AI package + contact (unchanged behavior, updated proxy contract)
// ────────────────────────────────────────────────────────────────

async function generatePackage(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  const prompt = `Genera un paquete de esquí en JSON puro (sin markdown) para:
Destino: ${p.destination}, Fechas: ${p.dates}, Viajeros: ${p.travelers}, Nivel: ${p.level}, Presupuesto: ${p.budget}

Devuelve EXACTAMENTE este JSON (precios en MXN):
{"resort_name":"...","hotel":{"name":"...","description":"...","stars":4},"itinerary":[{"day":1,"activity":"...","suggestion":"..."}],"cost_breakdown":{"hotel":0,"ski_pass":0,"equipment":0,"total_per_person_usd":0}}`;

  try {
    const data = await callProxy(
      proxyUrl,
      token,
      {
        provider: "gemini",
        path: "/v1beta/openai/chat/completions",
        method: "POST",
        body: {
          model: "gemini-2.0-flash",
          messages: [{ role: "user", content: prompt }],
        },
      },
      30000,
    );
    const raw: string = data?.choices?.[0]?.message?.content ?? "{}";
    const clean = raw.replace(/
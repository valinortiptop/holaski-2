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
    console.error(`action error [${action}]:`, msg);
    return err(msg, 500);
  }
});

// ────────────────────────────────────────────────────────────────
// Shared proxy caller
// ────────────────────────────────────────────────────────────────

async function callProxy(
  proxyUrl: string,
  token: string,
  payload: Record<string, unknown>,
  timeoutMs = 25000,
): Promise<any> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": token },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    clearTimeout(t);
    const text = await res.text();
    if (!res.ok) {
      // Surface proxy-side "provider not registered" clearly
      if (res.status === 404 && /integration/i.test(text)) {
        throw new Error(
          "hotelbeds_not_registered: Open /admin/integrations in Valinor and register 'hotelbeds' with auth=signature.",
        );
      }
      throw new Error(`proxy_${res.status}: ${text.slice(0, 300)}`);
    }
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  } catch (e) {
    clearTimeout(t);
    if ((e as Error).name === "AbortError") throw new Error("proxy_timeout");
    throw e;
  }
}

// ────────────────────────────────────────────────────────────────
// Hotelbeds handlers (via Valinor shared proxy)
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

  if (!destinationCode) throw new Error("destinationCode_required");
  if (!checkIn || !checkOut) throw new Error("dates_required");

  const payload = {
    stay: { checkIn, checkOut },
    occupancies: [{ rooms, adults, children: Number(children) || 0 }],
    destination: { code: destinationCode },
    currency,
    language,
  };

  const data = await callProxy(proxyUrl, token, {
    provider: "hotelbeds",
    path: "/hotel-api/1.0/hotels",
    method: "POST",
    payload,
  });

  const hotels = data?.hotels?.hotels ?? [];
  return {
    hotels: hotels.map((h: any) => ({
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
    total: data?.hotels?.total ?? hotels.length,
    checkIn: data?.hotels?.checkIn ?? checkIn,
    checkOut: data?.hotels?.checkOut ?? checkOut,
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
    payload: { rooms: [{ rateKey }] },
  });
  return data;
}

// ────────────────────────────────────────────────────────────────
// Existing: AI package generator + contact (unchanged logic)
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
        endpoint: "/v1beta/openai/chat/completions",
        payload: {
          model: "gemini-2.0-flash",
          messages: [{ role: "user", content: prompt }],
        },
      },
      30000,
    );
    const raw: string = data?.choices?.[0]?.message?.content ?? "{}";
    const clean = raw.replace(/
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

function ok(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function err(msg: string, status = 400) {
  return new Response(JSON.stringify({ error: msg }), { status, headers: JSON_HEADERS });
}

serve(async (req) => {
  // ── 1. PREFLIGHT — must be first, zero deps, cannot throw ──
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: CORS });
  }

  if (req.method !== "POST") return err("method_not_allowed", 405);

  // ── 2. Parse body ──
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return err("invalid_json", 400);
  }

  const action = String(body.action ?? "");
  console.log("api-handler invoked, action:", action);

  // ── 3. Ping — no proxy needed ──
  if (action === "ping") {
    return ok({ ok: true, ts: new Date().toISOString() });
  }

  // ── 4. Env validation ──
  const proxyUrl = Deno.env.get("VALINOR_PROXY_URL") ?? "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const proxyToken = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!proxyToken) {
    console.error("VALINOR_PROXY_TOKEN not set");
    return err("proxy_not_configured", 503);
  }

  // ── 5. Route actions ──
  try {
    if (action === "search-hotels") {
      return ok(await searchHotels(body, proxyUrl, proxyToken));
    }
    if (action === "generate-package") {
      return ok(await generatePackage(body, proxyUrl, proxyToken));
    }
    if (action === "send-contact") {
      return ok(await sendContact(body, proxyUrl, proxyToken));
    }
    return err(`unknown_action: ${action}`, 400);
  } catch (e) {
    console.error("action error:", action, (e as Error).message);
    return err((e as Error).message, 500);
  }
});

// ── Helpers ──

async function proxyPost(url: string, token: string, payload: unknown, timeoutMs = 20000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": token },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    clearTimeout(t);
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`proxy ${res.status}: ${txt.slice(0, 200)}`);
    }
    return await res.json();
  } catch (e) {
    clearTimeout(t);
    throw e;
  }
}

async function searchHotels(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  try {
    const data = await proxyPost(proxyUrl, token, {
      provider: "hotelbeds",
      path: "/hotel-api/1.0/hotels",
      method: "POST",
      payload: p,
    });
    return data;
  } catch (e) {
    console.error("searchHotels failed:", (e as Error).message);
    return { hotels: [], error: (e as Error).message };
  }
}

async function generatePackage(
  p: Record<string, unknown>,
  proxyUrl: string,
  token: string,
) {
  const prompt = `Genera un paquete de esquí en JSON puro (sin markdown) para:
Destino: ${p.destination}, Fechas: ${p.dates}, Viajeros: ${p.travelers}, Nivel: ${p.level}, Presupuesto: ${p.budget}

Devuelve EXACTAMENTE este JSON (precios en MXN):
{"resort_name":"...","hotel":{"name":"...","description":"...","stars":4},"itinerary":[{"day":1,"activity":"...","suggestion":"..."}],"cost_breakdown":{"hotel":0,"ski_pass":0,"equipment":0,"total_per_person_mxn":0}}`;

  try {
    const data = await proxyPost(proxyUrl, token, {
      provider: "gemini",
      endpoint: "/v1beta/openai/chat/completions",
      payload: {
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
      },
    }, 30000);

    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    const clean = raw.replace(/
// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json"
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const action = body.action || ""

    const PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy"
    const PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN")

    if (!PROXY_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Proxy not configured", results: getFallbackResorts() }),
        { status: 200, headers: corsHeaders }
      )
    }

    if (action === "ai-search") {
      return await handleAiSearch(body.query || "", PROXY_URL, PROXY_TOKEN)
    } else if (action === "send-contact") {
      return await handleSendContact(body, PROXY_URL, PROXY_TOKEN)
    } else if (action === "generate-package") {
      return await handleGeneratePackage(body, PROXY_URL, PROXY_TOKEN)
    } else {
      return new Response(
        JSON.stringify({ error: "Unknown action" }),
        { status: 400, headers: corsHeaders }
      )
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err), results: getFallbackResorts() }),
      { status: 200, headers: corsHeaders }
    )
  }
})

function stripFences(raw: string): string {
  let s = raw.trim()
  if (s.startsWith("")) s = s.slice(3)
  if (s.endsWith("
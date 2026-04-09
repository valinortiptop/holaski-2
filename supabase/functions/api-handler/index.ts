import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

/**
 * THIN ORCHESTRATOR ROUTER
 */
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

  try {
    const body = await req.json()
    const { action } = body

    const PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy"
    const PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN")

    if (!PROXY_TOKEN) {
      console.error("Configuration error: Missing PROXY_TOKEN")
      return new Response(
        JSON.stringify({ error: "Missing PROXY_TOKEN configuration" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const context = { PROXY_URL, PROXY_TOKEN, corsHeaders }

    switch (action) {
      case "ai-search":
        return await handleAiSearch(body.query, context)
      case "send-contact":
        return await handleSendContact(body, context)
      case "generate-package":
        return await handleGeneratePackage(body, context)
      default:
        console.error(`Unknown action requested: ${action}`)
        return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders })
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error("JSON parsing error:", err.message)
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    } else if (err instanceof TypeError) {
      console.error("Type error:", err.message)
      return new Response(
        JSON.stringify({ error: "Invalid request format" }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    } else {
      console.error("Unhandled error:", err.message, err.stack)
      return new Response(
        JSON.stringify({ error: "Internal server error" }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }
  }
})

/**
 * HANDLERS
 */

async function handleAiSearch(query: string, { PROXY_URL, PROXY_TOKEN, corsHeaders }: any) {
  if (!query?.trim()) return new Response(JSON.stringify({ results: [] }), { headers: corsHeaders })

  const systemPrompt = "Eres un experto en viajes de esqui. Sugiere 3 centros de esqui para la busqueda del usuario. Devuelve SOLO JSON: {\"results\":[{\"id\":\"slug\",\"resort_name\":\"Nombre\",\"country\":\"Pais\",\"region\":\"Region\",\"price_range_usd\":\"$X-$Y/dia\",\"difficulty\":\"intermediate\",\"highlights\":[\"a\",\"b\"],\"rating\":4.8,\"image_url\":\"https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600\",\"match_score\":95,\"why_it_matches\":\"Razon\"}]}"

  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": PROXY_TOKEN },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o",
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: query }],
          temperature: 0.7
        }
      })
    })

    if (!res.ok) {
      console.error(`AI search proxy error: ${res.status} ${res.statusText}`)
      return new Response(
        JSON.stringify({ error: "AI service unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const data = await res.json()
    let content = data.choices?.[0]?.message?.content || "{}"
    content = content.replace(/\s*/g, "").trim()
    
    return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err) {
    if (err instanceof TypeError && err.message.includes('fetch')) {
      console.error("Network error in AI search:", err.message)
      return new Response(
        JSON.stringify({ error: "Network connection failed" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    } else {
      console.error("AI search error:", err.message, err.stack)
      return new Response(
        JSON.stringify({ error: "AI search failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }
  }
}

async function handleSendContact(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders }: any) {
  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": PROXY_TOKEN },
      body: JSON.stringify({
        provider: "resend",
        endpoint: "/emails",
        payload: {
          from: "HolaSki <onboarding@resend.dev>",
          to: ["delivered@resend.dev"],
          subject: `Contacto de ${body.name}`,
          html: `<p><b>Email:</b> ${body.email}</p><p><b>Msj:</b> ${body.message}</p>`
        }
      })
    })

    if (!res.ok) {
      console.error(`Send contact proxy error: ${res.status} ${res.statusText}`)
      return new Response(
        JSON.stringify({ error: "Email service unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(JSON.stringify(await res.json()), { headers: corsHeaders })
  } catch (err) {
    console.error("Send contact error:", err.message, err.stack)
    return new Response(
      JSON.stringify({ error: "Failed to send contact message" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
}

async function handleGeneratePackage(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders }: any) {
  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": PROXY_TOKEN },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "Genera un paquete de viaje de esqui detallado en JSON. Todo en espanol. Solo JSON puro." },
            { role: "user", content: JSON.stringify(body) }
          ]
        }
      })
    })

    if (!res.ok) {
      console.error(`Generate package proxy error: ${res.status} ${res.statusText}`)
      return new Response(
        JSON.stringify({ error: "Package generation service unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const data = await res.json()
    let content = data.choices?.[0]?.message?.content || "{}"
    content = content.replace(/\s*/g, "").trim()
    return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err) {
    console.error("Generate package error:", err.message, err.stack)
    return new Response(
      JSON.stringify({ error: "Failed to generate package" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
}

function getFallbackResorts() {
  return [
    {
      id: "val-thorens",
      resort_name: "Val Thorens",
      country: "Francia",
      region: "Alpes",
      price_range_usd: "$200 - $350 /dia",
      difficulty: "intermediate",
      highlights: ["Nieve garantizada", "Ski-in/Ski-out"],
      rating: 4.8,
      image_url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600",
      match_score: 95,
      why_it_matches: "Excelente opcion para esquiadores intermedios."
    }
  ]
}
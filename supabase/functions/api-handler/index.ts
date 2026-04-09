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
      return new Response(
        JSON.stringify({ error: "Missing PROXY_TOKEN", results: getFallbackResorts() }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
        return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders })
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
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

    const data = await res.json()
    let content = data.choices?.[0]?.message?.content || "{}"
    content = content.replace(/\s*/g, "").trim()
    
    return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ results: getFallbackResorts() }), { headers: corsHeaders })
  }
}

async function handleSendContact(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders }: any) {
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
  return new Response(JSON.stringify(await res.json()), { headers: corsHeaders })
}

async function handleGeneratePackage(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders }: any) {
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
  const data = await res.json()
  let content = data.choices?.[0]?.message?.content || "{}"
  content = content.replace(/\s*/g, "").trim()
  return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } })
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

// package.json
{
  "name": "holaski-v2",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3",
    "@supabase/supabase-js": "^2.39.8",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "sonner": "^1.4.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.4"
  }
}

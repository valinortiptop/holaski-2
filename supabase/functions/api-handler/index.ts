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
    const { action } = body

    const PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy"
    const PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN")

    if (!PROXY_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Proxy not configured", results: getFallbackResorts() }),
        { status: 200, headers: corsHeaders }
      )
    }

    const ctx = { PROXY_URL, PROXY_TOKEN }

    switch (action) {
      case "ai-search":
        return await handleAiSearch(body.query, ctx)
      case "send-contact":
        return await handleSendContact(body, ctx)
      case "generate-package":
        return await handleGeneratePackage(body, ctx)
      default:
        return new Response(
          JSON.stringify({ error: "Unknown action: " + action }),
          { status: 400, headers: corsHeaders }
        )
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, results: getFallbackResorts() }),
      { status: 200, headers: corsHeaders }
    )
  }
})

function cleanJsonResponse(raw: string): string {
  let s = raw.trim()
  if (s.startsWith("")) {
      s = s.substring(0, s.length - 3)
    }
    s = s.trim()
  }
  return s
}

async function handleAiSearch(query: string, ctx: any) {
  if (!query || !query.trim()) {
    return new Response(JSON.stringify({ results: [] }), { headers: corsHeaders })
  }

  const systemPrompt = [
    "You are an expert ski travel advisor. The user describes what kind of ski trip they want.",
    "Return ONLY valid JSON with no markdown, no backticks, no extra text.",
    "",
    "Required format:",
    '{"results":[{"id":"unique-slug","resort_name":"Resort Name","country":"Country","region":"Region","price_range_usd":"$150-$300/day","difficulty":"beginner|intermediate|advanced","highlights":["Point 1","Point 2","Point 3"],"rating":4.8,"image_url":"IMG_URL","match_score":95,"why_it_matches":"Reason in Spanish"}]}',
    "",
    "Rules:",
    "- Return exactly 3 results",
    "- match_score: integer 70-99",
    "- rating: decimal 4.0-5.0",
    "- why_it_matches and highlights MUST be in Spanish",
    "- Use these exact image URLs (one per result):",
    "  Result 1: https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80",
    "  Result 2: https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&q=80",
    "  Result 3: https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    "- ONLY output the JSON object, nothing else"
  ].join("\n")

  try {
    const res = await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": ctx.PROXY_TOKEN
      },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    })

    if (!res.ok) {
      return new Response(
        JSON.stringify({ results: getFallbackResorts() }),
        { headers: corsHeaders }
      )
    }

    const data = await res.json()
    const rawContent = data.choices?.[0]?.message?.content || ""
    const cleaned = cleanJsonResponse(rawContent)

    try {
      const parsed = JSON.parse(cleaned)
      if (parsed.results && Array.isArray(parsed.results)) {
        return new Response(JSON.stringify(parsed), { headers: corsHeaders })
      }
    } catch {
      // Fallback below
    }

    return new Response(
      JSON.stringify({ results: getFallbackResorts() }),
      { headers: corsHeaders }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ results: getFallbackResorts() }),
      { headers: corsHeaders }
    )
  }
}

async function handleSendContact(body: any, ctx: any) {
  try {
    const res = await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": ctx.PROXY_TOKEN
      },
      body: JSON.stringify({
        provider: "resend",
        endpoint: "/emails",
        payload: {
          from: "HolaSki <onboarding@resend.dev>",
          to: ["delivered@resend.dev"],
          subject: "Nuevo contacto: " + (body.name || "Visitante"),
          html: "<h2>Mensaje de contacto</h2><p><b>Nombre:</b> " + (body.name || "N/A") + "</p><p><b>Email:</b> " + (body.email || "N/A") + "</p><p><b>Mensaje:</b> " + (body.message || "N/A") + "</p>"
        }
      })
    })
    const data = await res.json()
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: corsHeaders }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 200, headers: corsHeaders }
    )
  }
}

async function handleGeneratePackage(body: any, ctx: any) {
  try {
    const res = await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": ctx.PROXY_TOKEN
      },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Generate a detailed ski trip package in JSON. All text in Spanish. Only pure JSON, no markdown." },
            { role: "user", content: JSON.stringify(body) }
          ],
          temperature: 0.7,
          max_tokens: 3000
        }
      })
    })
    const data = await res.json()
    const rawContent = data.choices?.[0]?.message?.content || "{}"
    const cleaned = cleanJsonResponse(rawContent)
    try {
      const parsed = JSON.parse(cleaned)
      return new Response(JSON.stringify(parsed), { headers: corsHeaders })
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse package" }),
        { status: 200, headers: corsHeaders }
      )
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 200, headers: corsHeaders }
    )
  }
}

function getFallbackResorts() {
  return [
    {
      id: "val-thorens",
      resort_name: "Val Thorens",
      country: "Francia",
      region: "Alpes Franceses",
      price_range_usd: "$200 - $350/dia",
      difficulty: "intermediate",
      highlights: ["Estacion mas alta de Europa", "Nieve garantizada", "600km de pistas"],
      rating: 4.8,
      image_url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80",
      match_score: 92,
      why_it_matches: "Excelente opcion con nieve garantizada y terreno variado para todos los niveles."
    },
    {
      id: "zermatt",
      resort_name: "Zermatt",
      country: "Suiza",
      region: "Valais",
      price_range_usd: "$280 - $450/dia",
      difficulty: "intermediate",
      highlights: ["Vistas al Matterhorn", "Esqui todo el ano", "Pueblo alpino encantador"],
      rating: 4.9,
      image_url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&q=80",
      match_score: 88,
      why_it_matches: "Destino iconico con paisajes espectaculares y excelente infraestructura."
    },
    {
      id: "chamonix",
      resort_name: "Chamonix Mont-Blanc",
      country: "Francia",
      region: "Alta Saboya",
      price_range_usd: "$180 - $320/dia",
      difficulty: "advanced",
      highlights: ["Capital del alpinismo", "Vallee Blanche", "Ambiente vibrante"],
      rating: 4.7,
      image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      match_score: 85,
      why_it_matches: "La meca del esqui de montana con descensos legendarios y vida nocturna."
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

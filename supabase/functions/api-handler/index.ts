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

    const ctx = { PROXY_URL, PROXY_TOKEN }

    if (action === "ai-search") {
      return await handleAiSearch(body.query || "", ctx)
    } else if (action === "send-contact") {
      return await handleSendContact(body, ctx)
    } else if (action === "generate-package") {
      return await handleGeneratePackage(body, ctx)
    } else {
      return new Response(
        JSON.stringify({ error: "Unknown action: " + action }),
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

function stripMarkdownFences(raw: string): string {
  let s = raw.trim()
  if (s.startsWith("")) s = s.substring(0, s.length - 3)
  return s.trim()
}

async function handleAiSearch(query: string, ctx: { PROXY_URL: string; PROXY_TOKEN: string }) {
  if (!query.trim()) return new Response(JSON.stringify({ results: [] }), { headers: corsHeaders })

  const systemPrompt = "You are an expert ski travel advisor. Return ONLY valid JSON. Format: {\"results\":[{\"id\":\"slug\",\"resort_name\":\"Name\",\"country\":\"Country\",\"region\":\"Region\",\"price_range_usd\":\"$150-$300/day\",\"difficulty\":\"beginner|intermediate|advanced\",\"highlights\":[\"P1\",\"P2\"],\"rating\":4.8,\"image_url\":\"IMG_URL\",\"match_score\":95,\"why_it_matches\":\"Spanish text\"}]} Return 3 results. All descriptions in Spanish."

  try {
    const res = await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": ctx.PROXY_TOKEN },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: query }],
          temperature: 0.7
        }
      })
    })

    if (!res.ok) return new Response(JSON.stringify({ results: getFallbackResorts() }), { headers: corsHeaders })

    const data = await res.json()
    const rawContent = data.choices?.[0]?.message?.content || ""
    const cleaned = stripMarkdownFences(rawContent)

    try {
      const parsed = JSON.parse(cleaned)
      return new Response(JSON.stringify(parsed), { headers: corsHeaders })
    } catch {
      return new Response(JSON.stringify({ results: getFallbackResorts() }), { headers: corsHeaders })
    }
  } catch {
    return new Response(JSON.stringify({ results: getFallbackResorts() }), { headers: corsHeaders })
  }
}

async function handleSendContact(body: any, ctx: { PROXY_URL: string; PROXY_TOKEN: string }) {
  try {
    await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": ctx.PROXY_TOKEN },
      body: JSON.stringify({
        provider: "resend",
        endpoint: "/emails",
        payload: {
          from: "HolaSki <onboarding@resend.dev>",
          to: ["delivered@resend.dev"],
          subject: "Nuevo contacto: " + (body.name || "Visitante"),
          html: `<p><b>Nombre:</b> ${body.name}</p><p><b>Email:</b> ${body.email}</p><p><b>Mensaje:</b> ${body.message}</p>`
        }
      })
    })
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), { headers: corsHeaders })
  }
}

async function handleGeneratePackage(body: any, ctx: { PROXY_URL: string; PROXY_TOKEN: string }) {
  try {
    const res = await fetch(ctx.PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-proxy-token": ctx.PROXY_TOKEN },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Generate a detailed ski trip package in JSON. Spanish language." },
            { role: "user", content: JSON.stringify(body) }
          ]
        }
      })
    })
    const data = await res.json()
    const cleaned = stripMarkdownFences(data.choices?.[0]?.message?.content || "{}")
    return new Response(JSON.stringify(JSON.parse(cleaned)), { headers: corsHeaders })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { headers: corsHeaders })
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
      image_url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
      match_score: 92,
      why_it_matches: "Excelente opcion con nieve garantizada y terreno variado."
    },
    {
      id: "zermatt",
      resort_name: "Zermatt",
      country: "Suiza",
      region: "Valais",
      price_range_usd: "$280 - $450/dia",
      difficulty: "intermediate",
      highlights: ["Vistas al Matterhorn", "Esqui todo el ano"],
      rating: 4.9,
      image_url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800",
      match_score: 88,
      why_it_matches: "Destino iconico con paisajes espectaculares."
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

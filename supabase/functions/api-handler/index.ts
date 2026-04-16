// @ts-nocheck
// supabase/functions/api-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"
import { encode as hexEncode } from "https://deno.land/std@0.177.0/encoding/hex.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getHotelbedsSignature(apiKey: string, secret: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const toSign = apiKey + secret + timestamp
  const encoder = new TextEncoder()
  const data = encoder.encode(toSign)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = new Uint8Array(hashBuffer)
  const hashHex = hexEncode(hashArray)
  return hashHex
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const HOTELBEDS_API_KEY = 'e017e6436199af8134991a3c59ff13d2'
  const HOTELBEDS_SECRET = 'b08aa0bef6'
  const VALINOR_PROXY_URL = Deno.env.get('VALINOR_PROXY_URL') || 'https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy'
  const VALINOR_PROXY_TOKEN = Deno.env.get('VALINOR_PROXY_TOKEN')

  console.log("api-handler invoked")

  try {
    const body = await req.json()
    const { action, ...payload } = body
    console.log("api-handler invoked, action:", action)

    if (!VALINOR_PROXY_TOKEN) {
      return new Response(JSON.stringify({ error: 'Proxy token not configured' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (action === 'search-hotels') {
      return await handleSearchHotels(payload, HOTELBEDS_API_KEY, HOTELBEDS_SECRET)
    }

    if (action === 'build-package') {
      return await handleBuildPackage(payload, VALINOR_PROXY_URL, VALINOR_PROXY_TOKEN)
    }

    if (action === 'generate-package') {
      return await handleGeneratePackage(payload)
    }

    if (action === 'send-contact') {
      return await handleSendContact(payload, VALINOR_PROXY_URL, VALINOR_PROXY_TOKEN)
    }

    return new Response(JSON.stringify({ error: 'Action not found' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error("api-handler error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function handleSearchHotels(payload: any, apiKey: string, secret: string) {
  try {
    const { destination, checkIn, checkOut, adults = 2, children = 0 } = payload

    // Hotelbeds destination codes for ski regions
    const destinationCodes: Record<string, string> = {
      'bariloche': 'BRC',
      'mendoza': 'MDZ',
      'santiago': 'SCL',
      'valle nevado': 'SCL',
      'las lenas': 'MDZ',
      'cerro catedral': 'BRC',
      'whistler': 'YVR',
      'vail': 'EGE',
      'aspen': 'ASE',
      'chamonix': 'GVA',
      'zermatt': 'ZRH',
      'verbier': 'ZRH',
      'niseko': 'CTS',
      'st anton': 'INN',
    }

    const destLower = destination?.toLowerCase() || 'bariloche'
    let destCode = 'BRC'
    for (const [key, code] of Object.entries(destinationCodes)) {
      if (destLower.includes(key)) { destCode = code; break }
    }

    const signature = await getHotelbedsSignature(apiKey, secret)

    const searchBody = {
      stay: { checkIn, checkOut },
      occupancies: [{ rooms: 1, adults, children }],
      destination: { code: destCode },
      filter: { maxHotels: 6, minCategory: 3 },
    }

    const hotelbedsRes = await fetch('https://api.test.hotelbeds.com/hotel-api/1.0/hotels', {
      method: 'POST',
      headers: {
        'Api-key': apiKey,
        'X-Signature': signature,
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchBody),
      signal: AbortSignal.timeout(15000),
    })

    if (!hotelbedsRes.ok) {
      const errText = await hotelbedsRes.text()
      console.error("Hotelbeds error:", errText)
      throw new Error(`Hotelbeds API error: ${hotelbedsRes.status}`)
    }

    const data = await hotelbedsRes.json()
    const hotels = data?.hotels?.hotels || []

    const mapped = hotels.slice(0, 6).map((h: any) => ({
      hotelId: h.code,
      name: h.name,
      stars: h.categoryCode?.replace('EST', '') || '3',
      minRate: h.minRate,
      maxRate: h.maxRate,
      currency: h.currency,
      rooms: h.rooms?.slice(0, 2) || [],
    }))

    return new Response(JSON.stringify({ hotels: mapped, destination: destCode }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error("search-hotels error:", err)
    // Return fallback hotels so UI stays functional
    return new Response(JSON.stringify({
      hotels: getFallbackHotels(),
      fallback: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function handleBuildPackage(payload: any, proxyUrl: string, proxyToken: string) {
  try {
    const { hotel, destination, checkIn, checkOut, adults, children, skillLevel } = payload

    const nights = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    const hotelTotal = parseFloat(hotel.minRate || '0') * nights

    const prompt = `You are a ski travel expert building a vacation package in JSON format.

Hotel: ${hotel.name} (${hotel.stars} stars)
Destination: ${destination}
Check-in: ${checkIn} | Check-out: ${checkOut} (${nights} nights)
Guests: ${adults} adults, ${children} children
Skill level: ${skillLevel || 'intermediate'}
Hotel cost: USD $${hotelTotal.toFixed(0)} total

Build a complete ski package JSON with this exact structure:
{
  "package_title": "catchy title in Spanish",
  "destination": "${destination}",
  "highlights": ["3 bullet points in Spanish about why this trip rocks"],
  "hotel": {
    "name": "${hotel.name}",
    "stars": ${hotel.stars},
    "total_usd": ${hotelTotal.toFixed(0)}
  },
  "ski_pass": {
    "description": "description of ski pass included",
    "days": ${nights},
    "price_per_person_usd": <estimate based on destination, 40-120 USD range>
  },
  "transfer": {
    "description": "airport to resort private transfer description",
    "price_per_group_usd": <estimate 80-250 USD range>
  },
  "cost_breakdown": {
    "hotel_total": ${hotelTotal.toFixed(0)},
    "ski_pass_total": <ski_pass.price_per_person_usd * adults>,
    "transfer_total": <transfer.price_per_group_usd>,
    "grand_total_usd": <sum of all three>
  },
  "itinerary": [
    {"day": 1, "title": "Llegada", "description": "..."},
    {"day": 2, "title": "Primer día en pistas", "description": "..."},
    {"day": ${nights}, "title": "Regreso", "description": "..."}
  ],
  "best_for": "one sentence about ideal traveler for this package"
}`

    const aiRes = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'x-proxy-token': proxyToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'openai',
        endpoint: '/v1/chat/completions',
        payload: {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }
      }),
      signal: AbortSignal.timeout(25000),
    })

    if (!aiRes.ok) throw new Error(`OpenAI proxy error: ${aiRes.status}`)

    const aiData = await aiRes.json()
    const packageData = JSON.parse(aiData.choices[0].message.content)

    return new Response(JSON.stringify({ package: packageData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error("build-package error:", err)
    return new Response(JSON.stringify({
      package: getFallbackPackage(payload),
      fallback: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function handleSendContact(payload: any, proxyUrl: string, proxyToken: string) {
  try {
    const { name, email, message } = payload
    await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'x-proxy-token': proxyToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'resend',
        endpoint: '/emails',
        payload: {
          from: 'HolaSki <noreply@holaski.com>',
          to: ['hola@holaski.com'],
          subject: `Nuevo contacto de ${name}`,
          html: `<p><strong>${name}</strong> (${email}) escribió:</p><p>${message}</p>`
        }
      }),
      signal: AbortSignal.timeout(10000),
    })
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

async function handleGeneratePackage(config: any) {
  const basePrice = config.budget === 'luxury' ? 1200 : config.budget === 'moderate' ? 600 : 350
  const plan = {
    resort_name: config.destination,
    hotel: { name: `${config.destination} Mountain Inn`, stars: 4 },
    cost_breakdown: { total_per_person_usd: basePrice + 400 }
  }
  return new Response(JSON.stringify(plan), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

function getFallbackHotels() {
  return [
    { hotelId: 'F001', name: 'Llao Llao Hotel & Resort', stars: '5', minRate: '320', maxRate: '480', currency: 'USD', rooms: [] },
    { hotelId: 'F002', name: 'Panamericano Bariloche', stars: '4', minRate: '180', maxRate: '260', currency: 'USD', rooms: [] },
    { hotelId: 'F003', name: 'Design Suites Bariloche', stars: '4', minRate: '150', maxRate: '220', currency: 'USD', rooms: [] },
  ]
}

function getFallbackPackage(payload: any) {
  const nights = 5
  return {
    package_title: "Aventura en la Nieve – Paquete Completo",
    destination: payload.destination || "Bariloche",
    highlights: ["Nieve garantizada en temporada alta", "Hotel con vista a las montañas", "Pase de esquí incluido"],
    hotel: { name: payload.hotel?.name || "Mountain Lodge", stars: 4, total_usd: 900 },
    ski_pass: { description: "Pase de 5 días en todas las pistas", days: nights, price_per_person_usd: 75 },
    transfer: { description: "Traslado privado aeropuerto-resort", price_per_group_usd: 120 },
    cost_breakdown: { hotel_total: 900, ski_pass_total: 150, transfer_total: 120, grand_total_usd: 1170 },
    itinerary: [
      { day: 1, title: "Llegada y bienvenida", description: "Check-in y recorrido del resort." },
      { day: 2, title: "Primer día en pistas", description: "Esquí por las pistas principales." },
      { day: nights, title: "Regreso", description: "Check-out y traslado al aeropuerto." }
    ],
    best_for: "Familias y parejas que buscan una experiencia de nieve completa."
  }
}
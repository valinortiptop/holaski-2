// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const PROXY_URL = Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy";
  const PROXY_TOKEN = Deno.env.get("VALINOR_PROXY_TOKEN");

  if (!PROXY_TOKEN) {
    console.error("VALINOR_PROXY_TOKEN not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error. Proxy token missing." }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { action, ...params } = body;
    console.log("api-handler invoked, action:", action);

    if (action === "generate-trip") {
      return await handleGenerateTrip(params, PROXY_URL, PROXY_TOKEN, corsHeaders);
    }

    if (action === "recommend-resorts") {
      return await handleRecommendResorts(params, PROXY_URL, PROXY_TOKEN, corsHeaders);
    }

    if (action === "send-invite") {
      return await handleSendInvite(params, PROXY_URL, PROXY_TOKEN, corsHeaders);
    }

    if (action === "unsubscribe") {
      return await handleUnsubscribe(params, corsHeaders);
    }

    if (action === "ai-chat") {
      return await handleAIChat(params, PROXY_URL, PROXY_TOKEN, corsHeaders);
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("api-handler error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function handleGenerateTrip(
  params: any, proxyUrl: string, proxyToken: string, headers: any
) {
  const { experience, groupSize, budget, region, departureCity, travelDates, language } = params;

  const systemPrompt = `You are HolaSki's expert ski trip planner AI. You create detailed, realistic ski trip packages for Latin American travelers. Always respond in ${language === 'en' ? 'English' : 'Spanish'}. You must return ONLY valid JSON matching the exact schema provided, with no additional text before or after the JSON.`;

  const userPrompt = `Create 2 complete ski trip packages based on these preferences:
- Ski Experience Level: ${experience}
- Group Size: ${groupSize} people
- Budget Range: ${budget} USD per person
- Preferred Region: ${region}
- Departure City: ${departureCity || 'Santiago, Chile'}
- Travel Dates: ${travelDates || 'Flexible'}

Return a JSON object with this exact structure:
{
  "packages": [
    {
      "resort_name": "Resort Name",
      "resort_country": "Country",
      "resort_region": "${region}",
      "resort_description": "2-3 sentence description",
      "resort_image_keyword": "resort name for image search",
      "difficulty_match": "beginner|intermediate|advanced",
      "trip_duration_days": 7,
      "flight": {
        "airline": "Airline Name",
        "departure_city": "${departureCity || 'Santiago, Chile'}",
        "arrival_city": "Nearest Airport City",
        "outbound_date": "2025-07-15",
        "outbound_time": "08:30",
        "return_date": "2025-07-22",
        "return_time": "14:00",
        "price_usd": 850,
        "cabin_class": "Economy",
        "stops": 1,
        "duration_hours": 12
      },
      "hotel": {
        "name": "Hotel Name",
        "stars": 4,
        "check_in": "2025-07-15",
        "check_out": "2025-07-22",
        "room_type": "Double Room Mountain View",
        "price_per_night": 180,
        "total_price": 1260,
        "distance_to_slopes": "Ski-in/Ski-out",
        "amenities": ["Spa", "Restaurant", "Ski Storage", "WiFi"]
      },
      "ski_pass": {
        "type": "Full Area Pass",
        "duration_days": 6,
        "includes_insurance": true,
        "price_usd": 350,
        "coverage": "All lifts and runs"
      },
      "equipment": {
        "items": [
          {"type": "Skis", "category": "Performance", "price_per_day": 35},
          {"type": "Boots", "category": "Comfort", "price_per_day": 20},
          {"type": "Poles", "category": "Standard", "price_per_day": 8},
          {"type": "Helmet", "category": "Safety", "price_per_day": 12}
        ],
        "total_per_day": 75,
        "total_price": 450,
        "rental_days": 6
      },
      "transfers": {
        "type": "Private Shuttle",
        "airport_to_resort": 85,
        "resort_to_airport": 85,
        "total_price": 170
      },
      "lessons": {
        "available": true,
        "type": "Group lesson",
        "hours_per_day": 2,
        "days": 3,
        "price_usd": 240
      },
      "cost_breakdown": {
        "flights": 850,
        "hotel": 1260,
        "ski_pass": 350,
        "equipment": 450,
        "transfers": 170,
        "lessons": 240,
        "meals_estimate": 420,
        "insurance": 80,
        "subtotal": 3820,
        "taxes_and_fees": 382,
        "total_per_person_usd": 4202
      },
      "highlights": ["highlight 1", "highlight 2", "highlight 3"],
      "best_for": "Description of who this package is best for",
      "weather_forecast": "Expected conditions during travel dates"
    }
  ]
}

Make the packages realistic with actual resort names, realistic pricing for the budget range, and practical flight connections from Latin America. One package should be the best value, the other the premium option.`;

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": proxyToken,
      },
      body: JSON.stringify({
        provider: "openai",
        endpoint: "/v1/chat/completions",
        payload: {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: "json_object" }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI proxy error:", response.status, errText);
      throw new Error(`Proxy returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    const packages = JSON.parse(content);

    return new Response(
      JSON.stringify({ success: true, data: packages }),
      { status: 200, headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("generate-trip error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate trip package", details: String(err) }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
}

async function handleRecommendResorts(
  params: any, proxyUrl: string, proxyToken: string, headers: any
) {
  const { experience, budget, region, language } = params;
  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-token": proxyToken,
      },
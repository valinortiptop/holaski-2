// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { action, ...payload } = await req.json()

    if (action === 'generate-package') {
      return await handleGeneratePackage(payload)
    }

    return new Response(JSON.stringify({ error: 'Action not found' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function handleGeneratePackage(config: any) {
  // Simulate AI generation with logic based on parameters
  const basePrice = config.budget === 'luxury' ? 1200 : config.budget === 'moderate' ? 600 : 350;
  const multiplier = parseInt(config.travelers) || 1;
  
  const plan = {
    resort_name: config.destination,
    hotel: {
      name: `${config.destination} ${config.budget === 'luxury' ? 'Grand Lodge & Spa' : 'Mountain Inn'}`,
      description: `Ubicación ideal para nivel ${config.level}.`,
      stars: config.budget === 'luxury' ? 5 : config.budget === 'moderate' ? 4 : 3
    },
    itinerary: [
      { day: 1, activity: "Llegada y check-in", suggestion: "Retiro de equipos por la tarde." },
      { day: 2, activity: "Primer día de esquí", suggestion: config.level === 'beginner' ? "Clases matutinas en pistas verdes." : "Exploración de la zona alta." }
    ],
    cost_breakdown: {
      hotel: basePrice,
      ski_pass: 250,
      equipment: 150,
      total_per_person_usd: basePrice + 400
    }
  }

  return new Response(JSON.stringify(plan), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

// Timeout and retry configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Environment variable validation
interface RequiredEnvVars {
  VALINOR_PROXY_URL?: string;
  VALINOR_PROXY_TOKEN: string;
}

function validateEnvironmentVariables(): RequiredEnvVars {
  const requiredVars: (keyof RequiredEnvVars)[] = ['VALINOR_PROXY_TOKEN'];
  const missingVars: string[] = [];
  
  for (const varName of requiredVars) {
    const value = Deno.env.get(varName);
    if (!value) {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    console.error(JSON.stringify({
      level: 'FATAL',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      missingVars
    }));
    throw new Error(errorMessage);
  }
  
  return {
    VALINOR_PROXY_URL: Deno.env.get("VALINOR_PROXY_URL") || "https://htfhprzchvgcbquohgir.supabase.co/functions/v1/api-proxy",
    VALINOR_PROXY_TOKEN: Deno.env.get("VALINOR_PROXY_TOKEN")!
  };
}

// Validate environment variables on startup
const ENV_VARS = validateEnvironmentVariables();

// Structured logging utility
interface LogContext {
  requestId: string;
  action?: string;
  timestamp: string;
  userAgent?: string;
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function logInfo(message: string, context: LogContext, extra?: any) {
  console.log(JSON.stringify({
    level: 'INFO',
    message,
    context,
    extra,
  }));
}

function logError(message: string, context: LogContext, error?: any, extra?: any) {
  console.error(JSON.stringify({
    level: 'ERROR',
    message,
    context,
    error: error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : undefined,
    extra,
  }));
}

function logWarning(message: string, context: LogContext, extra?: any) {
  console.warn(JSON.stringify({
    level: 'WARNING',
    message,
    context,
    extra,
  }));
}

// Timeout utility function
function withTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

// Retry utility function
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  delay: number,
  logContext: LogContext
): Promise<T> {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        logError(`All ${maxRetries} attempts failed`, logContext, error);
        throw error;
      }
      
      logWarning(`Attempt ${attempt} failed, retrying in ${delay}ms`, logContext, {
        error: error.message,
        remainingAttempts: maxRetries - attempt
      });
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// Enhanced fetch with timeout and retry
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  logContext: LogContext
): Promise<Response> {
  return await withRetry(
    () => withTimeout(fetch(url, options), REQUEST_TIMEOUT),
    MAX_RETRIES,
    RETRY_DELAY,
    logContext
  );
}

/**
 * THIN ORCHESTRATOR ROUTER
 */
serve(async (req) => {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();
  const userAgent = req.headers.get('user-agent');
  
  const logContext: LogContext = {
    requestId,
    timestamp,
    userAgent,
  };

  logInfo('Request received', logContext, {
    method: req.method,
    url: req.url,
  });

  if (req.method === "OPTIONS") {
    logInfo('CORS preflight handled', logContext);
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;
    
    logContext.action = action;
    logInfo('Request body parsed', logContext, { action });

    const context = { PROXY_URL: ENV_VARS.VALINOR_PROXY_URL, PROXY_TOKEN: ENV_VARS.VALINOR_PROXY_TOKEN, corsHeaders, logContext };

    logInfo('Routing to action handler', logContext, { action });

    switch (action) {
      case "ai-search":
        return await handleAiSearch(body.query, context);
      case "send-contact":
        return await handleSendContact(body, context);
      case "generate-package":
        return await handleGeneratePackage(body, context);
      default:
        logError(`Unknown action requested: ${action}`, logContext);
        return new Response(
          JSON.stringify({ error: "Unknown action", requestId }), 
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      logError("JSON parsing error", logContext, err);
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload", requestId }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (err instanceof TypeError) {
      logError("Type error", logContext, err);
      return new Response(
        JSON.stringify({ error: "Invalid request format", requestId }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      logError("Unhandled error", logContext, err);
      return new Response(
        JSON.stringify({ error: "Internal server error", requestId }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
});

/**
 * HANDLERS
 */

async function handleAiSearch(query: string, { PROXY_URL, PROXY_TOKEN, corsHeaders, logContext }: any) {
  logInfo('AI search handler started', logContext, { queryLength: query?.length });

  if (!query?.trim()) {
    logWarning('Empty query received, returning empty results', logContext);
    return new Response(
      JSON.stringify({ results: [] }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const systemPrompt = "Eres un experto en viajes de esqui. Sugiere 3 centros de esqui para la busqueda del usuario. Devuelve SOLO JSON: {\"results\":[{\"id\":\"slug\",\"resort_name\":\"Nombre\",\"country\":\"Pais\",\"region\":\"Region\",\"price_range_usd\":\"$X-$Y/dia\",\"difficulty\":\"intermediate\",\"highlights\":[\"a\",\"b\"],\"rating\":4.8,\"image_url\":\"https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600\",\"match_score\":95,\"why_it_matches\":\"Razon\"}]}";

  try {
    logInfo('Making request to AI service', logContext, {
      timeout: REQUEST_TIMEOUT,
      maxRetries: MAX_RETRIES
    });
    
    const res = await fetchWithRetry(PROXY_URL, {
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
    }, logContext);

    if (!res.ok) {
      logError(`AI search proxy error: ${res.status} ${res.statusText}`, logContext, null, {
        status: res.status,
        statusText: res.statusText
      });
      
      // Try to get fallback results
      logInfo('Attempting fallback for AI search', logContext);
      return new Response(
        JSON.stringify({ results: getFallbackResorts(), fallback: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    content = content.replace(/\s*/g, "").trim();
    
    logInfo('AI search completed successfully', logContext, {
      responseLength: content.length
    });
    
    return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    if (err.message === 'Request timeout') {
      logError("AI search timeout", logContext, err);
      return new Response(
        JSON.stringify({ 
          results: getFallbackResorts(), 
          fallback: true,
          error: "Request timeout",
          requestId: logContext.requestId 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (err instanceof TypeError && err.message.includes('fetch')) {
      logError("Network error in AI search", logContext, err);
      return new Response(
        JSON.stringify({ 
          results: getFallbackResorts(), 
          fallback: true,
          error: "Network connection failed",
          requestId: logContext.requestId 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      logError("AI search error", logContext, err);
      return new Response(
        JSON.stringify({ 
          error: "AI search failed", 
          requestId: logContext.requestId 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
}

async function handleSendContact(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders, logContext }: any) {
  logInfo('Send contact handler started', logContext, {
    hasName: !!body.name,
    hasEmail: !!body.email,
    hasMessage: !!body.message
  });

  try {
    logInfo('Making request to email service', logContext, {
      timeout: REQUEST_TIMEOUT,
      maxRetries: MAX_RETRIES
    });
    
    const res = await fetchWithRetry(PROXY_URL, {
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
    }, logContext);

    if (!res.ok) {
      logError(`Send contact proxy error: ${res.status} ${res.statusText}`, logContext, null, {
        status: res.status,
        statusText: res.statusText
      });
      return new Response(
        JSON.stringify({ 
          error: "Email service unavailable", 
          requestId: logContext.requestId 
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const responseData = await res.json();
    logInfo('Contact email sent successfully', logContext);
    
    return new Response(
      JSON.stringify(responseData), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    if (err.message === 'Request timeout') {
      logError("Send contact timeout", logContext, err);
      return new Response(
        JSON.stringify({ 
          error: "Request timeout - please try again", 
          requestId: logContext.requestId 
        }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      logError("Send contact error", logContext, err);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send contact message", 
          requestId: logContext.requestId 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
}

async function handleGeneratePackage(body: any, { PROXY_URL, PROXY_TOKEN, corsHeaders, logContext }: any) {
  logInfo('Generate package handler started', logContext, {
    bodyKeys: Object.keys(body || {})
  });

  try {
    logInfo('Making request to package generation service', logContext, {
      timeout: REQUEST_TIMEOUT,
      maxRetries: MAX_RETRIES
    });
    
    const res = await fetchWithRetry(PROXY_URL, {
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
    }, logContext);

    if (!res.ok) {
      logError(`Generate package proxy error: ${res.status} ${res.statusText}`, logContext, null, {
        status: res.status,
        statusText: res.statusText
      });
      return new Response(
        JSON.stringify({ 
          error: "Package generation service unavailable", 
          requestId: logContext.requestId 
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    content = content.replace(/\s*/g, "").trim();
    
    logInfo('Package generation completed successfully', logContext, {
      responseLength: content.length
    });
    
    return new Response(content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    if (err.message === 'Request timeout') {
      logError("Generate package timeout", logContext, err);
      return new Response(
        JSON.stringify({ 
          error: "Request timeout - please try again", 
          requestId: logContext.requestId 
        }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      logError("Generate package error", logContext, err);
      return new Response(
        JSON.stringify({ 
          error: "Failed to generate package", 
          requestId: logContext.requestId 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
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
  ];
}

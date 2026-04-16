# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-16T22:52:19.921Z_

## You're right — let me verify what's actually deployed

Looking at the screenshot, I can see two distinct problems:

1. **CORS error persists** on `/buscar` page calling the edge function — the preflight is still failing
2. **Search results page** (`SearchResultsPage` or similar at `/buscar`) is still showing **USD $320, USD $180, USD $150** — I only updated `TripPlannerPage.tsx`, not the search results page

Let me verify what's actually on the deployed edge function and check the search page file.

:::verify:verify-query
{
  "id": "check-edge-function-deployed",
  "query": "SELECT 1 as check_db_connected"
}
:::

## What went wrong

**My last response had two gaps:**

1. **Wrong file targeted for MXN conversion.** The screenshot shows `/buscar` (search results) displaying "USD $320", "USD $180", "USD $150". I updated `TripPlannerPage.tsx` (the `/planificador` page), but the hardcoded USD fallback prices live in a **different** file — likely `SearchResultsPage.tsx` or `BuscarPage.tsx` which renders hotel cards with fallback data when the edge function fails. I never touched that file.

2. **CORS fix may not have taken effect.** Even though I changed the edge function code to use wildcard `*`, the error you're seeing is identical to before: *"Response to preflight request doesn't pass access control check: It does not have HTTP ok status."* This means one of:
   - The edge function crashed on cold start (env var check failing **before** OPTIONS returns)
   - The deploy didn't actually update
   - There's a different edge function being called (check the URL — it's hitting `kmehmrtrktgqdiafitkv.supabase.co/functions/v1/...` — which function exactly?)

## What I need to investigate before writing more code

I need to read these files from the project context to give you a real fix instead of another blind patch:

- `src/pages/SearchResultsPage.tsx` (or whatever renders `/buscar`) — to find the hardcoded USD prices
- The component calling `supabase.functions.invoke(...)` on that page — to see which action name and which function it's hitting
- Confirm the current deployed `api-handler/index.ts` actually has OPTIONS returning before env checks

## Honest answer to your question

**No, I did not fully fix them.** I fixed the Trip Planner page prices and patched CORS logic in the edge function, but:
- The `/buscar` page uses different code I didn't modify
- The preflight is still failing, which suggests either my CORS fix didn't deploy correctly or the function is crashing before reaching the OPTIONS handler

**Can you confirm:** which file renders the `/buscar` route? It should be in `src/App.tsx` as a `<Route path="/buscar" element={...} />`. Once I know the exact filename, I'll fix both the USD→MXN conversion on that page **and** add proper diagnostic logging to figure out why the edge function preflight is failing (likely an unhandled throw before the OPTIONS early-return).
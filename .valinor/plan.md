# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-16T23:08:07.959Z_

## Hotelbeds API Configuration Plan

I'll walk through exactly how to wire Hotelbeds into HolaSki properly. No code yet — let's align on the approach first.

### The Core Decision: Which Path to Take

Looking at your project memory, there's been friction around CORS and Edge Function deployment. I see two possible architectures, and **only one is correct** per your platform rules:

| Option | Approach | Verdict |
|---|---|---|
| **A** | Store `HOTELBEDS_API_KEY` + `HOTELBEDS_SECRET` directly in this project's Supabase secrets, sign requests inside `api-handler` | ❌ Violates platform rules |
| **B** | Register Hotelbeds in Valinor's `integrations_registry` once, then call via the shared `api-proxy` from `api-handler` | ✅ Correct path |

Per rule #21 (*Use api-proxy for all third-party APIs*): child projects must NOT wrap Hotelbeds themselves, must NOT store the API key/secret locally, and must NOT ask end-users for secrets. The signature generation (HMAC-SHA256 of `apiKey + secret + timestamp`) belongs in the Valinor proxy, not here.

### What Hotelbeds Actually Requires

From the web context and Hotelbeds docs, every request needs:

- **`Api-key`** header — the public API key
- **`X-Signature`** header — `SHA256(apiKey + secret + unixTimestamp)` (it's SHA-256, not HMAC, despite common confusion)
- **`Accept: application/json`** and **`Accept-Encoding: gzip`**
- **Base URL**: `https://api.test.hotelbeds.com` (sandbox) or `https://api.hotelbeds.com` (production)

This is exactly the `signature` auth type the Valinor `api-proxy` supports (per rule #21: *"auto-resolves auth (api key, bearer, signature, query-param) from the integrations_registry"*).

### Recommended Path: Register Hotelbeds in Valinor

**Step 1 — You (admin) register Hotelbeds once in Valinor's integration registry:**

- Open `/admin/integrations` in the Valinor admin panel
- Click **Add Integration**
- Provider name: `hotelbeds`
- Auth type: `signature` (SHA-256 of `apiKey + secret + timestamp`)
- API key: `e017e6436199af8134991a3c59ff13d2`
- Secret: `b08aa0bef6` *(this looks truncated — Hotelbeds secrets are usually 10+ chars, please verify)*
- Base URL: `https://api.test.hotelbeds.com` (start with sandbox)
- Required headers: `Api-key`, `X-Signature`, `Accept: application/json`

After that's done, **every** child project (including HolaSki) can call Hotelbeds through `api-proxy` with zero local config.

**Step 2 — I refactor `api-handler` in HolaSki to use the shared proxy pattern:**

```
Frontend → api-handler (HolaSki) → api-proxy (Valinor) → Hotelbeds
```

The `api-handler` becomes a thin orchestrator that just forwards `{ provider: 'hotelbeds', path: '...', method: 'POST', payload: {...} }`. No keys, no signing, no secrets in HolaSki.

### Questions Before I Build

1. **Is the secret `b08aa0bef6` complete?** Hotelbeds secrets are typically longer. Please double-check in your Hotelbeds developer dashboard — a wrong secret = `InvalidSignature` errors on every call.

2. **Sandbox or production?** I strongly recommend starting with `api.test.hotelbeds.com` until we confirm the search/availability flow works end-to-end.

3. **Has Hotelbeds been registered in Valinor yet?** If yes, I can skip straight to refactoring `api-handler`. If no, you'll need to register it first (I can't do that from inside HolaSki).

4. **Which Hotelbeds endpoints do we actually need right now?** My guess based on the app:
   - `POST /hotel-api/1.0/hotels` — availability search (date range, destination, occupancy)
   - `GET /hotel-content-api/1.0/hotels/{code}/details` — hotel details page
   - `POST /hotel-api/1.0/checkrates` — confirm price before booking
   - *(Bookings come later — let's not wire that until search works.)*

### What I'll Build Once You Confirm

- **Refactor `api-handler`** — `search-hotels` and new `hotel-details`, `check-rates` actions, all routed through `api-proxy` with `provider: 'hotelbeds'`
- **Add a ski-destination filter** — Hotelbeds has `destinationCode` for ski areas (e.g., `BRC` Bariloche, `LEN` Las Leñas, `VNV` Valle Nevado); I'll hardcode the mapping
- **Update `SearchResultsPage`** — wire real Hotelbeds response shape (hotels, rates in MXN via `currency: 'MXN'` param), pagination, empty states, loading skeletons
- **Add resilient fallback** — if Hotelbeds is down or returns empty, show the existing hardcoded resort cards with a soft "Mostrando destinos destacados" banner (per the graceful-degradation rule)

### Verification I'll Run After Build

```
:::verify:verify-query — confirm leads table captures hotelbeds rate_key on inquiry submit
:::verify: — ping api-handler with { action: "search-hotels", destinationCode: "BRC", ... } and confirm 200 + hotel array
```

### Please Confirm

1. ✅ / ❌ Secret `b08aa0bef6` is complete (or paste the full one)
2. ✅ Sandbox first, ❌ production first
3. Is Hotelbeds already registered in Valinor's `/admin/integrations`?
4. Endpoints I listed look right, or anything to add/remove?

Once you answer, say **"build it"** and I'll ship the full refactor in one shot.
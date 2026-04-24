# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-24T17:17:42.056Z_

## Investigation

Looking at your screenshots carefully:

### Screenshot 1 — Hero Dropdown (still broken)
The dropdown on the **homepage hero** is still the OLD one — flat list (Cerro Catedral → Las Leñas → Valle Nevado → Chapelco → Whistler), no country groups, no sticky headers, and **cut off at the bottom**. This means the hero component is rendering its own inline dropdown — NOT using my new `DestinationSelect`. I need to find that hero component and patch it directly.

### Screenshot 2 — Planear Viaje page
You're seeing a blank page that just shows the footer. This means `PlanearViajePage.tsx` is either not routed correctly, or the route renders but the component doesn't mount. Mobile view + footer visible = content area is empty.

## What I'll Do

Since I can't see the exact hero file in my context, I need you to tell me **one thing** so I patch the right file on the first shot:

**In your repo, which file contains the hero section with the text "AVENTURA EN NIEVE" and the "¿A dónde quieres ir?" input?**

Most likely candidates based on common patterns:
- `src/components/Hero.tsx`
- `src/components/HeroSearch.tsx`
- `src/pages/HomePage.tsx` (inline hero)
- `src/pages/Index.tsx`
- `src/components/sections/Hero.tsx`

### My Plan Once You Confirm

**1. Fix the hero dropdown (correct file)**
- Replace the inline destination `<select>` / custom dropdown with `<DestinationSelect />`
- Remove any `overflow-hidden` on the parent search card that's clipping the dropdown
- Ensure the parent has `position: relative` and NO `overflow-hidden` so `z-50` absolute dropdown escapes

**2. Fix `PlanearViajePage.tsx` showing blank**
Likely causes I'll investigate:
- **Route not registered** in `App.tsx` → the path `/planear` or `/planear-viaje` points nowhere, so only layout shell renders
- **Import path mismatch** → case-sensitivity issue (`PlanearViajePage` vs `PlanearViaje`)
- **Runtime error** in the component throwing silently → needs error boundary check
- **Default export missing** → lazy import returns undefined

**3. Verify after fix**
I'll emit `:::verify:` blocks to confirm:
- The routes registered
- The component mounted
- No console errors

## Quick Diagnostic I Can Do Right Now

Can you also tell me:

1. **What URL do you navigate to** for Planear Viaje? (`/planear`, `/planear-viaje`, `/plan`?)
2. **Does the footer link "Planear Viaje"** lead to the blank page, or does clicking it do nothing?
3. **Open browser DevTools → Console** on the blank Planear page — any red errors? (This tells me immediately if it's a runtime error vs routing issue)

Once I know the hero file name + the route path, I can push both fixes in one shot and verify them. Without that, I'd be guessing and creating more files that don't get wired up — same failure mode as last turn.

**Alternatively**, if you want me to just proceed with my best guess: I'll assume hero is in `src/components/Hero.tsx` and Planear route is `/planear-viaje`, patch those, and fall back gracefully if wrong. Say "proceed with best guess" and I'll go.
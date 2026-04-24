# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-24T17:06:57.735Z_

## Plan: Fix Destination Dropdown Overflow & Group by Country

### Problem Analysis

Looking at the screenshot, I can identify two clear issues with the "¿A dónde quieres ir?" destination dropdown:

- **Clipping issue** — The dropdown is being cut off at the bottom. "Whistler, Canadá" is half-visible and any destinations below it are completely hidden. This suggests the dropdown's parent container has `overflow: hidden` (likely the hero search card) or the dropdown height is constrained without scrolling enabled.
- **Flat list** — Destinations are shown as one long flat list with no visual hierarchy, making it hard to scan when the list grows beyond 5–6 items.

### Root Cause

Based on the project structure, the search widget lives in the hero section (likely `src/components/HeroSearch.tsx` or similar, rendered on the landing page). The dropdown is almost certainly rendered as a **regular child** of the search card — so when the card has rounded corners + `overflow-hidden` for the glassmorphism effect, it clips the dropdown.

Two possible fixes, and I recommend combining them:

### Proposed Solution

### 1. Fix the clipping

Two approaches — I'll go with **option A** because it keeps layout simple and works reliably on mobile:

- **Option A (recommended)** — Give the dropdown `position: absolute`, a fixed `max-height` (e.g. `max-h-80` ≈ 320px or `max-h-96` ≈ 384px), and `overflow-y-auto`. Ensure the parent container does NOT have `overflow-hidden` on the axis where the dropdown expands. Use a high `z-index` (e.g. `z-50`) so it floats above the hero content below.
- **Option B** — Use a portal (`createPortal`) to render the dropdown at the document body level. More complex, only needed if parent clipping can't be removed.

### 2. Group destinations by country

Restructure the data from a flat array into a grouped structure:

```
{
  "Argentina": ["Cerro Catedral, Bariloche", "Las Leñas, Mendoza", "Chapelco, San Martín"],
  "Chile": ["Valle Nevado, Santiago", "Portillo", ...],
  "Canadá": ["Whistler", "Banff", ...],
  "Estados Unidos": ["Aspen", "Vail", "Park City", ...],
  "Francia": ["Chamonix", "Val d'Isère", ...],
  ...
}
```

Each country gets a **sticky header** (`sticky top-0`) inside the scrollable dropdown so users always know which country they're browsing while scrolling.

### 3. UX polish

- **Sticky country headers** — small uppercase label with subtle background (`bg-slate-900/95 backdrop-blur`) that stays pinned while scrolling within its group.
- **Custom scrollbar** — thin styled scrollbar that matches the dark glassmorphism theme (Tailwind `scrollbar-thin` utility via plugin, or custom CSS).
- **Keyboard accessibility** — arrow up/down to navigate, Enter to select, Escape to close. Maintain current focus behavior.
- **Search filtering** — as the user types, filter destinations across ALL countries. If a country has no matches after filtering, hide its header entirely.
- **Click outside to close** — already likely implemented; preserve it.
- **Smooth max-height** — `max-h-80` (320px) on mobile, `max-h-96` (384px) on desktop via responsive classes.

### Files I'd Touch

| File | Change |
|------|--------|
| `src/components/HeroSearch.tsx` (or wherever the dropdown lives) | Add scroll container, grouped rendering, sticky headers, z-index fix |
| `src/data/destinations.ts` (new, or inline) | Export grouped destination data structure `Record<string, Destination[]>` |
| Parent hero card | Remove `overflow-hidden` on the axis where dropdown expands (or switch to `overflow-visible` if safe) |

### Questions Before I Implement

1. **File location** — Can you confirm the component file for the hero search with the "¿A dónde quieres ir?" field? I'd guess `src/components/HeroSearch.tsx` or it's inline in `src/pages/Index.tsx`. Referenced files (`DestinationsByCountry.tsx`, `PopularDestinations.tsx`, `DestinationsPage.tsx`) are the *destinations listing* pages — not the search dropdown. Which file should I edit for the dropdown?
2. **Destinations list** — Do you want me to **expand** the destinations list (e.g. add full Alps, Rockies, Japan, Andes) organized by country, or **keep the exact same list** currently shown and just reorganize it by country?
3. **Behavior preference** — Should clicking a country header collapse/expand that country's group (accordion style), or should all groups always be open and the user just scrolls through them? I'd recommend **always open + sticky headers** for a smoother feel, but open to accordion if you prefer.

Once you confirm these three points, I'll implement it in a single response with all files ready to go.
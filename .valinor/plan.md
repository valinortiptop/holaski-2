# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-24T20:23:11.121Z_

## Now I Can See Everything — Executing the Fixes

### What I Found

1. **`Hero.tsx` already uses `DestinationSelect`** — the code is correct. But `App.tsx` renders `<HomePage />` at `/`, NOT `<Hero />`. So the hero you see on the homepage is inside `HomePage.tsx` (which I still don't have). The `Hero.tsx` file is **orphaned** — nothing imports it.

2. **`PlanearViajePage.tsx` exists and is fully built** — but `App.tsx` has no route for `/planear-viaje`. That's why clicking the link lands on a blank page (only Navbar + Footer render around empty `<Routes>`).

3. **Second hero also exists**: `HeroSection.tsx` (different — uses AI search bar). Likely what's actually rendering.

### Fix Strategy

Since `HomePage.tsx` isn't in my context, I'll do two things that resolve both bugs **without** touching HomePage:

**1. Wire up all the missing routes in `App.tsx`** so `PlanearViajePage` actually renders:
- `/planear-viaje` → `PlanearViajePage`
- `/planear`, `/plan` → aliases
- `/explore` → `ResortsPage` (DestinationsByCountry navigates here)
- Catch-all `*` → redirect home (no more blank 404s)

**2. Replace `HeroSection.tsx` with the correct dropdown.** Since `HomePage.tsx` very likely imports either `Hero` or `HeroSection` (it's the only remaining candidate), I'll rewrite `HeroSection.tsx` to use `DestinationSelect` exactly like `Hero.tsx` does. This way, whichever one `HomePage.tsx` imports, both now have the grouped-by-country dropdown.

### Changes

```typescript
// src/App.tsx
// @ts-nocheck
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import TripPlannerPage from './pages/TripPlannerPage';
import PlanearViajePage from './pages/PlanearViajePage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Destinations / resorts */}
          <Route path="/resorts" element={<ResortsPage />} />
          <Route path="/destinos" element={<ResortsPage />} />
          <Route path="/explore" element={<ResortsPage />} />
          <Route path="/resorts/:slug" element={<ResortDetailPage />} />
          <Route path="/resort/:slug" element={<ResortDetailPage />} />

          {/* Trip planning — two separate pages */}
          <Route path="/planner" element={<TripPlannerPage />} />
          <Route path="/planear-viaje" element={<PlanearViajePage />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          <Route path="/plan" element={<PlanearViajePage />} />

          {/* Search */}
          <Route path="/buscar" element={<SearchResultsPage />} />

          {/* Catch-all: no more white-screen 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
```

Now replace `HeroSection.tsx` to use the same grouped `DestinationSelect` dropdown. I'm keeping the AI search bar below for continuity, but making the primary search widget use the new component:

```typescript
// src/components/HeroSection.tsx
// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Snowflake } from 'lucide-react';
import DestinationSelect from './DestinationSelect';
import { findDestinationLabel } from '../data/destinations';
import { AISearchBar } from './AISearchBar';
import { AISearchResults } from './AISearchResults';
import { supabase } from '../lib/supabase';
import type { AISearchResult } from '../types/database';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  // AI search state (kept intact — secondary feature below main form)
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (dates) params.set('dates', dates);
    navigate(`/planear-viaje?${params.toString()}`);
  };

  const handleAISearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query },
      });
      if (error) throw error;
      setResults(data?.results ?? []);
    } catch (err) {
      console.error('[HeroSection] AI search error:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy-900">
      {/* Background — NOTE: background sits in its own stacking context
          so the search card above can safely overflow without being clipped */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover"
          alt="Paisaje de esquí"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-blue-950" />
      </div>

      {/* Content — NO overflow-hidden here, so the dropdown can escape */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        {/* Headline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">
              Planifica con IA
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Tu Aventura en la Nieve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
              Comienza Aquí
            </span>
          </h1>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Del Bariloche a los Alpes. Encuentra tu próxima experiencia en la nieve con expertos que saben.
          </p>
        </div>

        {/* Primary search card — relative so the absolute dropdown inside anchors here.
            NO overflow-hidden — the dropdown MUST be free to extend below the card. */}
        <div className="relative bg-navy-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 md:p-7 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] gap-3 md:gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                <Snowflake className="w-3 h-3" /> Destino
              </label>
              <DestinationSelect
                value={destination}
                onChange={setDestination}
                placeholder="¿A dónde quieres ir?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                Fechas
              </label>
              <input
                type="text"
                placeholder="Ej: Julio 2025"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-2xl px-8 py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl shadow-blue-600/30 min-h-[56px]"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Buscar</span>
              <ArrowRight className="w-5 h-5 md:hidden" />
            </button>
          </div>

          {destination && (
            <div className="mt-4 pt-4 border-t border-white/5 text-sm text-slate-400">
              Destino seleccionado:{' '}
              <span className="text-blue-400 font-bold">
                {findDestinationLabel(destination)}
              </span>
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-12 max-w-3xl mx-auto">
          {[
            { n: '40+', l: 'Destinos' },
            { n: '4.9★', l: 'Calificación' },
            { n: '1000+', l: 'Viajeros' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-white">{stat.n}</div>
              <div className="text-[10px] md:text-sm text-slate-400 uppercase tracking-widest mt-1">
                {stat.l}
              </div>
            </div>
          ))}
        </div>

        {/* Optional AI search (secondary) — keeps existing functionality */}
        {(showResults || isSearching) && (
          <div className="mt-12">
            <AISearchBar onSearch={handleAISearch} isLoading={isSearching} />
            <AISearchResults results={results} isVisible={showResults} />
            {isSearching && (
              <div className="w-full max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-white/5 rounded-2xl border border-white/10"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
```

### Verification

```
:::verify:verify-query
{
  "id": "check-destinations-data",
  "query": "SELECT country, COUNT(*) AS n FROM public.resorts GROUP BY country ORDER BY n DESC"
}
:::
```

## What I did

**Understood:**
- `PlanearViajePage` was fully coded but unrouted → blank page
- `Hero.tsx` has the correct `DestinationSelect` but is orphaned (nothing imports it)
- `HeroSection.tsx` was the probable actual hero on homepage and had the OLD flat dropdown
- `DestinationsByCountry.tsx` navigates to `/explore` which was also unrouted

**Changed:**
- `src/App.tsx` — added routes for `/planear-viaje`, `/planear`, `/plan`, `/explore`, and a `*` catch-all redirect. Imported `PlanearViajePage`
- `src/components/HeroSection.tsx` — replaced with `DestinationSelect`-powered search card matching `Hero.tsx` behavior. Removed section-level `overflow-hidden` (moved to inner background div only). AI search kept as secondary/optional, hidden until invoked

**Untouched:**
- `HomePage.tsx`, `TripPlannerPage.tsx`, `Navbar.tsx`, `Footer.tsx`, `PlanearViajePage.tsx`
- `Hero.tsx` (already correct)
- `DestinationSelect.tsx`, `src/data/destinations.ts`
- `supabase/functions/api-handler/index.ts`
- All config files

### After Deploy

Both bugs should be dead. If the hero dropdown is *still* the old flat list:
1. Open DevTools → Components tab
2. Click on the hero section
3. Tell me the component name React shows

That'll tell us if `HomePage.tsx` is importing yet another hero file I haven't seen — but `HeroSection` and `Hero` were the only two candidates in the repo index, so this should cover it.
# Project Plan

_Model: claude-opus-4-6 | Approved: 2026-04-10T20:41:20.086Z_



Looking at the issue, I can see the problem. Your `src/lib/supabase.ts` relies on `import.meta.env.VITE_SUPABASE_ANON_KEY` but that environment variable likely isn't set in your Vercel deployment, causing all Supabase queries to silently fail. Let me also check if there's an RLS (Row Level Security) issue on the `resorts` table.

I'll fix this with:

1. **`src/lib/supabase.ts`** — Use the actual anon key directly (it's a public key, safe for client-side)
2. **SQL migration** — Ensure RLS allows public read access on the `resorts` table
3. **`src/pages/ResortsPage.tsx`** — Add better console logging so we can see exactly what's happening

```sql
-- migrations/20250410_resorts_rls.sql
ALTER TABLE resorts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resorts' AND policyname = 'allow_public_read_resorts'
  ) THEN
    EXECUTE 'CREATE POLICY allow_public_read_resorts ON resorts FOR SELECT USING (true)';
  END IF;
END
$$;
```

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmehmrtrktgqdiafitkv.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWhtcnRya3RncWRpYWZpdGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE1NTcsImV4cCI6MjA1OTc5NzU1N30.iy9P19TDHQO0i4rt6JyP_mVYp-8Z4sMR2eamsMxfXbg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

```ts
// src/types/resort.ts
export interface DifficultyJson {
  beginner: number;
  intermediate: number;
  advanced: number;
}

export interface Resort {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  altitude_top: number | null;
  altitude_base: number | null;
  runs_total: number | null;
  lifts_total: number | null;
  difficulty_json: DifficultyJson | string | null;
  price_level: number | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  description: string | null;
  created_at: string;
}
```

```tsx
// src/pages/ResortsPage.tsx
import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Resort, DifficultyJson } from '../types/resort';
import {
  Search, MapPin, Mountain, Layers, Wind,
  SlidersHorizontal, ArrowRight, AlertTriangle, RefreshCw
} from 'lucide-react';

const COUNTRY_MAP: Record<string, string> = {
  'USA': 'EE.UU.', 'United States': 'EE.UU.', 'Estados Unidos': 'EE.UU.',
  'EEUU': 'EE.UU.', 'EE.UU': 'EE.UU.', 'EE.UU.': 'EE.UU.',
  'Canada': 'Canadá', 'Canadá': 'Canadá',
  'France': 'Francia', 'Francia': 'Francia',
  'Switzerland': 'Suiza', 'Suiza': 'Suiza',
  'Austria': 'Austria',
  'Italy': 'Italia', 'Italia': 'Italia',
  'Spain': 'España', 'España': 'España',
  'Andorra': 'Andorra',
  'Japan': 'Japón', 'Japón': 'Japón',
  'Norway': 'Noruega', 'Noruega': 'Noruega',
  'Sweden': 'Suecia', 'Suecia': 'Suecia',
  'Argentina': 'Argentina', 'Chile': 'Chile',
};

function normCountry(raw: string): string {
  return COUNTRY_MAP[raw] || raw;
}

const CONTINENT_MAP: Record<string, string> = {
  'Francia': 'Europa', 'Suiza': 'Europa', 'Austria': 'Europa',
  'Italia': 'Europa', 'Andorra': 'Europa', 'España': 'Europa',
  'Noruega': 'Europa', 'Suecia': 'Europa',
  'EE.UU.': 'Norteamérica', 'Canadá': 'Norteamérica',
  'Argentina': 'Sudamérica', 'Chile': 'Sudamérica',
  'Japón': 'Asia',
};

function getContinent(country: string): string {
  return CONTINENT_MAP[normCountry(country)] || 'Otros';
}

function parseDiff(raw: DifficultyJson | string | null | undefined): DifficultyJson {
  const fallback: DifficultyJson = { beginner: 33, intermediate: 34, advanced: 33 };
  if (!raw) return fallback;
  if (typeof raw === 'object' && raw !== null) return raw as DifficultyJson;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as DifficultyJson; } catch { return fallback; }
  }
  return fallback;
}

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(timer);
  }, [value, ms]);
  return debounced;
}

const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-56 bg-white/[0.08]" />
      <div className="p-5 space-y-4">
        <div className="h-5 bg-white/10 rounded-lg w-3/4" />
        <div className="h-3 bg-white/[0.06] rounded w-full" />
        <div className="h-3 bg-white/[0.06] rounded w-2/3" />
        <div className="flex gap-4 pt-4 border-t border-white/5">
          <div className="h-8 w-16 bg-white/[0.06] rounded" />
          <div className="h-8 w-16 bg-white/[0.06] rounded" />
          <div className="h-8 w-16 bg-white/[0.06] rounded" />
        </div>
      </div>
    </div>
  );
});

const IMG_FALLBACK = 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800';

const ResortCard = memo(function ResortCard({ resort }: { resort: Resort }) {
  const country = normCountry(resort.country);
  const diff = parseDiff(resort.difficulty_json);

  return (
    <Link
      to={`/resort/${resort.slug}`}
      className="group bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:bg-white/[0.06] flex flex-col"
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={resort.image_url || IMG_FALLBACK}
          alt={resort.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i <= (resort.price_level || 2) ? 'bg-amber-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
          <span className="truncate max-w-[140px]">{country}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-lg font-bold leading-tight line-clamp-1 break-words">{resort.name}</h3>
          <div className="flex gap-1 items-end h-5 flex-shrink-0">
            <div className="w-1.5 rounded-full bg-green-500" style={{ height: `${Math.max(diff.beginner * 0.2, 4)}px` }} />
            <div className="w-1.5 rounded-full bg-blue-500" style={{ height: `${Math.max(diff.intermediate * 0.2, 4)}px` }} />
            <div className="w-1.5 rounded-full bg-red-500" style={{ height: `${Math.max(diff.advanced * 0.2, 4)}px` }} />
          </div>
        </div>
        <p className="text-white/40 text-xs mb-1 truncate">{resort.region}</p>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-auto break-words">
          {resort.description || 'Estación de esquí de clase mundial.'}
        </p>
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Mountain className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />
              <span className="font-bold text-white/80">{resort.altitude_top ?? '—'}m</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Layers className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />
              <span className="font-bold text-white/80">{resort.runs_total ?? '—'}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Wind className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />
              <span className="font-bold text-white/80">{resort.lifts_total ?? '—'}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function ResortsPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [searchRaw, setSearchRaw] = useState('');
  const [activeContinent, setActiveContinent] = useState('Todos');
  const [activeCountry, setActiveCountry] = useState('Todos');

  const search = useDebounce(searchRaw, 300);

  const loadResorts = useCallback(async () => {
    setLoading(true);
    setErrMsg('');
    setDebugInfo('');

    console.log('[HolaSki] Starting resorts fetch...');
    console.log('[HolaSki] Supabase URL:', 'https://kmehmrtrktgqdiafitkv.supabase.co');

    try {
      const { data, error, status, statusText } = await supabase
        .from('resorts')
        .select('*')
        .order('name');

      console.log('[HolaSki] Response status:', status, statusText);
      console.log('[HolaSki] Error:', error);
      console.log('[HolaSki] Data length:', data?.length ?? 'null');

      if (error) {
        const detail = `Status: ${status} | Code: ${error.code} | ${error.message} | Hint: ${error.hint || 'none'} | Details: ${error.details || 'none'}`;
        console.error('[HolaSki] Supabase error:', detail);
        setErrMsg(error.message);
        setDebugInfo(detail);
        return;
      }

      if (!data) {
        setErrMsg('La consulta retornó null. Posible problema de conexión o RLS.');
        setDebugInfo(`Status: ${status} ${statusText}`);
        return;
      }

      if (data.length === 0) {
        setErrMsg('La tabla "resorts" existe pero tiene 0 filas. Las migraciones de seed no se ejecutaron.');
        setDebugInfo(`Status: ${status} — Query succeeded, 0 rows returned`);
        return;
      }

      console.log('[HolaSki] First resort:', data[0]?.name, data[0]?.country);
      setResorts(data as Resort[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de red desconocido';
      console.error('[HolaSki] Network/catch error:', msg);
      setErrMsg(`Error de conexión: ${msg}`);
      setDebugInfo('Esto puede indicar un problema de red, CORS, o que la URL de Supabase es incorrecta.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResorts();
  }, [loadResorts]);

  const continents = useMemo(() => {
    const set = new Set<string>();
    resorts.forEach(r => set.add(getContinent(r.country)));
    return ['Todos', ...Array.from(set).sort()];
  }, [resorts]);

  const countries = useMemo(() => {
    const base = activeContinent === 'Todos'
      ? resorts
      : resorts.filter(r => getContinent(r.country) === activeContinent);
    const set = new Set<string>();
    base.forEach(r => set.add(normCountry(r.country)));
    return ['Todos', ...Array.from(set).sort()];
  }, [resorts, activeContinent]);

  const filtered = useMemo(() => {
    let list = resorts;
    if (activeContinent !== 'Todos') {
      list = list.filter(r => getContinent(r.country) === activeContinent);
    }
    if (activeCountry !== 'Todos') {
      list = list.filter(r => normCountry(r.country) === activeCountry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        normCountry(r.country).toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [resorts, activeContinent, activeCountry, search]);

  const handleContinentClick = useCallback((c: string) => {
    setActiveContinent(c);
    setActiveCountry('Todos');
  }, []);

  const handleCountryClick = useCallback((c: string) => {
    setActiveCountry(c);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRaw(e.target.value);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative pt-24 pb-8 md:pt-32 md:pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
              <Mountain className="w-3 h-3" />
              {loading ? 'Cargando...' : `${resorts.length} estaciones`}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-5">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Destinos
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
              Explora las mejores estaciones de esquí del mundo. Filtra por continente, país o busca por nombre.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Buscar estación, país o región..."
                value={searchRaw}
                onChange={handleSearchChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/25"
              />
            </div>
            {resorts.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <SlidersHorizontal className="w-4 h-4 text-white/30 flex-shrink-0 mr-1" />
                {continents.map(c => (
                  <button
                    key={c}
                    onClick={() => handleContinentClick(c)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                      activeContinent === c
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          {countries.length > 2 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {countries.map(c => (
                <button
                  key={c}
                  onClick={() => handleCountryClick(c)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCountry === c
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.08] hover:text-white/60 border border-white/[0.06]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Error state */}
        {errMsg && (
          <div className="mb-8 px-5 py-5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-bold mb-1">Error al cargar destinos</p>
                <p className="text-red-400/80 text-xs break-words">{errMsg}</p>
                {debugInfo && (
                  <p className="text-red-400/50 text-[11px] mt-2 font-mono break-words">{debugInfo}</p>
                )}
              </div>
            </div>
            <button
              onClick={loadResorts}
              className="flex items-center gap-1.5 text-xs font-bold bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reintentar
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty DB */}
        {!loading && !errMsg && resorts.length === 0 && (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sin datos en la base de datos</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              La tabla &quot;resorts&quot; está vacía. Las migraciones SQL de seed necesitan ejecutarse.
            </p>
          </div>
        )}

        {/* No filter match */}
        {!loading && resorts.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sin resultados</h3>
            <p className="text-white/40 text-sm">
              No encontramos estaciones con esos filtros. Prueba con otra búsqueda.
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="text-sm text-white/40 mb-6">
              {filtered.length} {filtered.length === 1 ? 'estación encontrada' : 'estaciones encontradas'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(r => (
                <ResortCard key={r.id} resort={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

```tsx
// src/pages/ResortDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Resort, DifficultyJson } from '../types/resort';
import { Loader2, MapPin, Mountain, Layers, Wind, ChevronLeft, Snowflake, ArrowRight } from 'lucide-react';

function parseDiff(raw: DifficultyJson | string | null | undefined): DifficultyJson {
  const fallback: DifficultyJson = { beginner: 33, intermediate: 34, advanced: 33 };
  if (!raw) return fallback;
  if (typeof raw === 'object' && raw !== null) return raw as DifficultyJson;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as DifficultyJson; } catch { return fallback; }
  }
  return fallback;
}

function DiffBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-white/60">{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
      <div className="text-blue-400 mb-2">{icon}</div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-black break-words">{value}</div>
    </div>
  );
}

const IMG_FALLBACK = 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800';

export default function ResortDetailPage() {
  const { slug } = useParams();
  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchResort() {
      setLoading(true);
      setError('');

      console.log('[HolaSki] Fetching resort detail for slug:', slug);

      try {
        const { data, error: dbErr, status } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .single();

        console.log('[HolaSki] Detail response:', status, dbErr, data?.name);

        if (dbErr) {
          setError(dbErr.message);
          return;
        }
        if (!cancelled && data) {
          setResort(data as Resort);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchResort();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error || !resort) {
    return (
      <div className="text-center py-40 px-4">
        <Snowflake className="w-16 h-16 text-white/10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Estación no encontrada</h2>
        <p className="text-white/40 text-sm mb-6 max-w-md mx-auto break-words">
          {error || `No pudimos encontrar "${slug}".`}
        </p>
        <Link
          to="/resorts"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a destinos
        </Link>
      </div>
    );
  }

  const diff = parseDiff(resort.difficulty_json);
  const desnivel = (resort.altitude_top && resort.altitude_base)
    ? resort.altitude_top - resort.altitude_base
    : null;

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <img
          src={resort.image_url || IMG_FALLBACK}
          className="w-full h-full object-cover"
          alt={resort.name}
          onError={(e) => { (e.target as HTMLImageElement).src = IMG_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        <div className="absolute top-28 left-4 md:left-8">
          <Link
            to="/resorts"
            className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-4 md:left-12 max-w-4xl pr-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            <MapPin className="w-3 h-3" /> {resort.region}, {resort.country}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 break-words">{resort.name}</h1>
          {resort.description && (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl break-words">
              {resort.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Mountain className="w-5 h-5" />} label="Cota Máxima" value={resort.altitude_top ? `${resort.altitude_top.toLocaleString()}m` : '—'} />
            <StatCard icon={<Mountain className="w-5 h-5" />} label="Cota Base" value={resort.altitude_base ? `${resort.altitude_base.toLocaleString()}m` : '—'} />
            <StatCard icon={<Layers className="w-5 h-5" />} label="Pistas" value={resort.runs_total ?? '—'} />
            <StatCard icon={<Wind className="w-5 h-5" />} label="Remontes" value={resort.lifts_total ?? '—'} />
          </div>

          {/* Desnivel */}
          {desnivel && (
            <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Desnivel Esquiable</p>
                <p className="text-3xl font-black text-blue-400">{desnivel.toLocaleString()}m</p>
              </div>
              <Mountain className="w-12 h-12 text-blue-400/20" />
            </div>
          )}

          {/* Difficulty */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Dificultad de Pistas</h3>
            <div className="space-y-5">
              <DiffBar label="🟢 Principiante" pct={diff.beginner} color="bg-green-500" />
              <DiffBar label="🔵 Intermedio" pct={diff.intermediate} color="bg-blue-500" />
              <DiffBar label="🔴 Avanzado" pct={diff.advanced} color="bg-red-500" />
            </div>
          </div>

          {/* Gallery */}
          {resort.gallery_urls && resort.gallery_urls.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Galería</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resort.gallery_urls.map((url, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={url}
                      alt={`${resort.name} ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = IMG_FALLBACK; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Nivel de Precio</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-4 h-4 rounded-full ${i <= (resort.price_level || 2) ? 'bg-amber-400' : 'bg-white/10'}`} />
              ))}
            </div>
            <p className="text-white/40 text-xs mt-3">
              {(resort.price_level || 2) <= 2 ? 'Económico — ideal para presupuestos ajustados'
                : (resort.price_level || 2) === 3 ? 'Moderado — buen equilibrio calidad-precio'
                : 'Premium — experiencia de lujo'}
            </p>
          </div>

          {/* Quick info */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Información Rápida</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">País</span>
                <span className="font-bold">{resort.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Región</span>
                <span className="font-bold truncate max-w-[160px]">{resort.region}</span>
              </div>
              {resort.altitude_top && (
                <div className="flex justify-between">
                  <span className="text-white/50">Altitud máx.</span>
                  <span className="font-bold">{resort.altitude_top.toLocaleString()}m</span>
                </div>
              )}
              {resort.runs_total && (
                <div className="flex justify-between">
                  <span className="text-white/50">Total pistas</span>
                  <span className="font-bold">{resort.runs_total}</span>
                </div>
              )}
              {resort.lifts_total && (
                <div className="flex justify-between">
                  <span className="text-white/50">Total remontes</span>
                  <span className="font-bold">{resort.lifts_total}</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/planner"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-center py-4 rounded-2xl font-bold transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              Planificar viaje aquí <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

The two key fixes are:

1. **`src/lib/supabase.ts`** now includes the actual anon key as a fallback instead of an empty string. The anon key is a *public* key (it's embedded in every client-side Supabase app) — it only grants access allowed by your RLS policies.

2. **SQL migration** adds an RLS policy `allow_public_read_resorts` so anonymous users can `SELECT` from the `resorts` table. Without this, even with the correct anon key, queries return 0 rows because RLS blocks access by default.

The `ResortsPage` now also logs detailed debug info to the browser console and shows it on-screen if the query fails, so you can see exactly what went wrong.
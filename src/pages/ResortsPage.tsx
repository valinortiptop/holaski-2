// @ts-nocheck
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

      console.log('[HolaSki] Loaded', data.length, 'resorts. First:', data[0]?.name);
      setResorts(data as Resort[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de red desconocido';
      console.error('[HolaSki] Network/catch error:', msg);
      setErrMsg(`Error de conexión: ${msg}`);
      setDebugInfo('Posible problema de red, CORS, o URL de Supabase incorrecta.');
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
      {/* Hero header */}
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

      {/* Sticky filter bar */}
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/25 min-h-[44px]"
              />
            </div>
            {resorts.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <SlidersHorizontal className="w-4 h-4 text-white/30 flex-shrink-0 mr-1" />
                {continents.map(c => (
                  <button
                    key={c}
                    onClick={() => handleContinentClick(c)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 min-h-[44px] ${
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
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex-shrink-0 min-h-[44px] ${
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

      {/* Content area */}
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
              className="flex items-center gap-1.5 text-xs font-bold bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors min-h-[44px]"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reintentar
            </button>
          </div>
        )}

        {/* Loading skeleton grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty database state */}
        {!loading && !errMsg && resorts.length === 0 && (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sin datos en la base de datos</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              La tabla &quot;resorts&quot; está vacía. Las migraciones SQL de seed necesitan ejecutarse.
            </p>
          </div>
        )}

        {/* No filter results */}
        {!loading && resorts.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sin resultados</h3>
            <p className="text-white/40 text-sm">
              No encontramos estaciones con esos filtros. Prueba con otra búsqueda.
            </p>
          </div>
        )}

        {/* Results grid */}
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
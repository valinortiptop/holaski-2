// @ts-nocheck
import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Mountain, Layers, Wind, SlidersHorizontal, ArrowRight } from 'lucide-react';

const COUNTRY_NORMALIZE: Record<string, string> = {
  'USA': 'EE.UU.',
  'United States': 'EE.UU.',
  'Estados Unidos': 'EE.UU.',
  'EEUU': 'EE.UU.',
  'EE.UU': 'EE.UU.',
  'Canada': 'Canadá',
  'France': 'Francia',
  'Switzerland': 'Suiza',
  'Austria': 'Austria',
  'Italy': 'Italia',
  'Spain': 'España',
  'Andorra': 'Andorra',
  'Japan': 'Japón',
  'Argentina': 'Argentina',
  'Chile': 'Chile',
};

function normalizeCountry(raw: string): string {
  if (!raw) return '';
  return COUNTRY_NORMALIZE[raw] || raw;
}

const CONTINENT_MAP: Record<string, string> = {
  'Francia': 'Europa',
  'Suiza': 'Europa',
  'Austria': 'Europa',
  'Italia': 'Europa',
  'Andorra': 'Europa',
  'España': 'Europa',
  'EE.UU.': 'Norteamérica',
  'Canadá': 'Norteamérica',
  'Argentina': 'Sudamérica',
  'Chile': 'Sudamérica',
  'Japón': 'Asia',
};

function getContinent(country: string): string {
  return CONTINENT_MAP[normalizeCountry(country)] || 'Otros';
}

interface DifficultyJson {
  beginner: number;
  intermediate: number;
  advanced: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-56 bg-white/5" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-white/10 rounded-lg w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="flex gap-4 pt-4 border-t border-white/5">
          <div className="h-8 w-16 bg-white/5 rounded" />
          <div className="h-8 w-16 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
});

const DifficultyDots = memo(function DifficultyDots({ difficulty }: { difficulty: DifficultyJson }) {
  return (
    <div className="flex gap-1 items-end h-5">
      <div className="w-1.5 rounded-full bg-green-500" style={{ height: `${Math.max((difficulty?.beginner || 0) * 0.2, 4)}px` }} />
      <div className="w-1.5 rounded-full bg-blue-500" style={{ height: `${Math.max((difficulty?.intermediate || 0) * 0.2, 4)}px` }} />
      <div className="w-1.5 rounded-full bg-red-500" style={{ height: `${Math.max((difficulty?.advanced || 0) * 0.2, 4)}px` }} />
    </div>
  );
});

const ResortCard = memo(function ResortCard({ resort }: { resort: Resort }) {
  const normalized = normalizeCountry(resort.country);
  const diff = (typeof resort.difficulty_json === 'string'
    ? JSON.parse(resort.difficulty_json)
    : resort.difficulty_json) as DifficultyJson;

  return (
    <Link
      to={`/resort/${resort.slug}`}
      className="group bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:bg-white/[0.06] flex flex-col"
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={resort.image_url}
          alt={resort.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i < (resort.price_level || 3) ? 'bg-amber-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
          <span className="truncate max-w-[120px]">{normalized}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-lg font-bold leading-tight line-clamp-1">{resort.name}</h3>
          <DifficultyDots difficulty={diff} />
        </div>
        <p className="text-white/40 text-xs mb-1 truncate">{resort.region}</p>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-auto">
          {resort.description}
        </p>
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Mountain className="w-3.5 h-3.5 text-blue-400/70" />
              <span className="font-bold text-white/80">{resort.altitude_top}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Layers className="w-3.5 h-3.5 text-blue-400/70" />
              <span className="font-bold text-white/80">{resort.runs_total}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Wind className="w-3.5 h-3.5 text-blue-400/70" />
              <span className="font-bold text-white/80">{resort.lifts_total}</span>
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
  const [error, setError] = useState(false);
  const [searchRaw, setSearchRaw] = useState('');
  const [activeContinent, setActiveContinent] = useState('Todos');
  const [activeCountry, setActiveCountry] = useState('Todos');

  const search = useDebounce(searchRaw, 300);

  useEffect(() => {
    let cancelled = false;
    async function fetchResorts() {
      try {
        const { data, error: dbError } = await supabase
          .from('resorts')
          .select('*')
          .order('name');
        if (dbError) throw dbError;
        if (!cancelled && data) setResorts(data);
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchResorts();
    return () => { cancelled = true; };
  }, []);

  const continents = useMemo(() => {
    const set = new Set<string>();
    resorts.forEach(r => set.add(getContinent(r.country)));
    return ['Todos', ...Array.from(set).sort()];
  }, [resorts]);

  const countriesForContinent = useMemo(() => {
    const set = new Set<string>();
    const baseList = activeContinent === 'Todos' 
      ? resorts 
      : resorts.filter(r => getContinent(r.country) === activeContinent);
    
    baseList.forEach(r => set.add(normalizeCountry(r.country)));
    return ['Todos', ...Array.from(set).sort()];
  }, [resorts, activeContinent]);

  const filtered = useMemo(() => {
    let list = resorts;
    if (activeContinent !== 'Todos') {
      list = list.filter(r => getContinent(r.country) === activeContinent);
    }
    if (activeCountry !== 'Todos') {
      list = list.filter(r => normalizeCountry(r.country) === activeCountry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        normalizeCountry(r.country).toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q)
      );
    }
    return list;
  }, [resorts, activeContinent, activeCountry, search]);

  const handleContinentChange = useCallback((c: string) => {
    setActiveContinent(c);
    setActiveCountry('Todos');
  }, []);

  const handleCountryChange = useCallback((c: string) => {
    setActiveCountry(c);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRaw(e.target.value);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative pt-24 pb-8 md:pt-32 md:pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
              <Mountain className="w-3 h-3" />
              {resorts.length} estaciones disponibles
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-5">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Destinos
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
              Explora las mejores estaciones de esquí del mundo. Filtra por continente, país o busca por nombre para encontrar tu destino perfecto.
            </p>
          </div>
        </div>
      </div>

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
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              <SlidersHorizontal className="w-4 h-4 text-white/30 flex-shrink-0 mr-1" />
              {continents.map(c => (
                <button
                  key={c}
                  onClick={() => handleContinentChange(c)}
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
          </div>

          {countriesForContinent.length > 2 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {countriesForContinent.map(c => (
                <button
                  key={c}
                  onClick={() => handleCountryChange(c)}
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

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="mb-6 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm">
            Error al cargar los datos. Por favor, intenta de nuevo más tarde.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sin resultados</h3>
            <p className="text-white/40 text-sm">
              No encontramos estaciones que coincidan con tu búsqueda. Prueba con otros filtros.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-white/40">
                {filtered.length} {filtered.length === 1 ? 'estación encontrada' : 'estaciones encontradas'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(resort => (
                <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
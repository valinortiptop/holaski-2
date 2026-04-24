// @ts-nocheck
// src/pages/BuscarPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Mountain, Activity, ArrowLeft, Calendar, Users, SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import DestinationSelect from '../components/DestinationSelect';
import { findDestinationLabel } from '../data/destinations';

type Resort = {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  altitude_top?: number;
  altitude_base?: number;
  runs_total?: number;
  lifts_total?: number;
  image_url?: string;
  price_level?: number;
  description?: string;
};

const FALLBACK_RESORTS: Resort[] = [
  { id: '1', slug: 'cerro-catedral', name: 'Cerro Catedral', country: 'Argentina', region: 'Bariloche', altitude_top: 2180, runs_total: 120, price_level: 3, image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800' },
  { id: '2', slug: 'las-lenas', name: 'Las Leñas', country: 'Argentina', region: 'Mendoza', altitude_top: 3430, runs_total: 29, price_level: 4, image_url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800' },
  { id: '3', slug: 'valle-nevado', name: 'Valle Nevado', country: 'Chile', region: 'Santiago', altitude_top: 3670, runs_total: 44, price_level: 4, image_url: 'https://images.unsplash.com/photo-1548873430-43d45fad8b30?w=800' },
];

export default function BuscarPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [destFilter, setDestFilter] = useState(searchParams.get('destination') || '');
  const [dates, setDates] = useState(searchParams.get('dates') || '');
  const [travelers, setTravelers] = useState(searchParams.get('travelers') || '2 adultos');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: dbError } = await supabase
          .from('resorts')
          .select('id, slug, name, country, region, altitude_top, altitude_base, runs_total, lifts_total, image_url, price_level, description')
          .order('name', { ascending: true });

        if (cancelled) return;

        if (dbError || !data || data.length === 0) {
          setResorts(FALLBACK_RESORTS);
          if (dbError) setError('Mostrando destinos de ejemplo');
        } else {
          setResorts(data as Resort[]);
        }
      } catch {
        if (!cancelled) {
          setResorts(FALLBACK_RESORTS);
          setError('Sin conexión. Mostrando destinos de ejemplo.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredResorts = useMemo(() => {
    if (!destFilter) return resorts;
    const label = findDestinationLabel(destFilter) || destFilter;
    const lower = label.toLowerCase();
    return resorts.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.country.toLowerCase().includes(lower) ||
        r.region?.toLowerCase().includes(lower)
    );
  }, [resorts, destFilter]);

  const handleNewSearch = () => {
    const params = new URLSearchParams();
    if (destFilter) params.set('destination', destFilter);
    if (dates) params.set('dates', dates);
    if (travelers) params.set('travelers', travelers);
    setSearchParams(params);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setDestFilter('');
    setDates('');
    setTravelers('2 adultos');
    setSearchParams(new URLSearchParams());
  };

  const priceLabel = (lvl?: number) => {
    if (!lvl) return '—';
    return '$'.repeat(Math.max(1, Math.min(4, lvl)));
  };

  const activeFiltersCount = [destFilter, dates].filter(Boolean).length;
  const destLabel = destFilter ? findDestinationLabel(destFilter) || destFilter : '';

  return (
    <div className="min-h-screen bg-navy-900 pt-24 md:pt-28 pb-20">
      {/* Header with results count */}
      <div className="sticky top-16 md:top-20 z-30 bg-navy-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">
              {loading ? 'Buscando...' : `${filteredResorts.length} ${filteredResorts.length === 1 ? 'destino' : 'destinos'}`}
            </h1>
            {destLabel && (
              <p className="text-xs md:text-sm text-slate-400 truncate max-w-[220px] md:max-w-none">
                en {destLabel}
              </p>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider text-sm rounded-full px-4 md:px-5 py-2.5 transition-all min-h-[44px]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-blue-600 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {(destFilter || dates) && (
          <div className="max-w-7xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto">
            {destFilter && (
              <button
                onClick={() => setDestFilter('')}
                className="flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-200 text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-blue-600/30 transition-colors"
              >
                <MapPin className="w-3 h-3" /> {destLabel}
                <X className="w-3 h-3" />
              </button>
            )}
            {dates && (
              <button
                onClick={() => setDates('')}
                className="flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-200 text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-blue-600/30 transition-colors"
              >
                <Calendar className="w-3 h-3" /> {dates}
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-white underline whitespace-nowrap ml-2"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {error && !loading && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-sm">
            ⚠ {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-navy-950/50 border border-white/5 rounded-3xl overflow-hidden">
                <div className="aspect-video bg-white/5 animate-pulse" />
                <div className="p-5">
                  <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse mb-3" />
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse mb-4" />
                  <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-2 uppercase">Sin resultados</h2>
            <p className="text-slate-400 mb-6">No encontramos destinos que coincidan con tu búsqueda.</p>
            <button
              onClick={clearFilters}
              className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Ver todos los destinos
            </button>
          </div>
        )}

        {!loading && filteredResorts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredResorts.map((resort) => (
              <button
                key={resort.id}
                onClick={() => navigate(`/resort/${resort.slug}`)}
                className="group bg-navy-950/50 border border-white/10 rounded-3xl overflow-hidden text-left hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-navy-900">
                  {resort.image_url ? (
                    <img
                      src={resort.image_url}
                      alt={resort.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mountain className="w-12 h-12 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-300">
                    {priceLabel(resort.price_level)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight truncate mb-2">
                    {resort.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {resort.region ? `${resort.region}, ` : ''}
                      {resort.country}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {resort.altitude_top && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Mountain className="w-3.5 h-3.5 text-blue-400" />
                        <span>{resort.altitude_top}m</span>
                      </div>
                    )}
                    {resort.runs_total && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Activity className="w-3.5 h-3.5 text-blue-400" />
                        <span>{resort.runs_total} pistas</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter panel — bottom sheet on mobile, modal on desktop */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative w-full md:max-w-lg bg-navy-950 border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Filtros</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
                  Destino
                </label>
                <DestinationSelect value={destFilter} onChange={setDestFilter} placeholder="Todos los destinos" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Fechas
                </label>
                <input
                  type="text"
                  placeholder="Ej: Julio 2025"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-1">
                  <Users className="w-3 h-3" /> Viajeros
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                >
                  <option>1 adulto</option>
                  <option>2 adultos</option>
                  <option>3 adultos</option>
                  <option>4 adultos</option>
                  <option>Familia (2+2)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider rounded-2xl px-6 py-3 transition-all min-h-[48px]"
              >
                Limpiar
              </button>
              <button
                onClick={handleNewSearch}
                className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-2xl px-6 py-3 flex items-center justify-center gap-2 transition-all min-h-[48px]"
              >
                <Search className="w-5 h-5" />
                Ver resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
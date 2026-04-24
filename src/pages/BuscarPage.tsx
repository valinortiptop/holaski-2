// @ts-nocheck
// src/pages/BuscarPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Mountain, Activity, ArrowLeft, Calendar, Users } from 'lucide-react';
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

  const [destFilter, setDestFilter] = useState(searchParams.get('destination') || '');
  const [dates, setDates] = useState(searchParams.get('dates') || '');
  const [travelers, setTravelers] = useState(searchParams.get('travelers') || '2 adultos');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      console.log('[HolaSki] Starting resorts fetch...');
      setLoading(true);
      setError(null);

      try {
        const { data, error: dbError, status } = await supabase
          .from('resorts')
          .select('id, slug, name, country, region, altitude_top, altitude_base, runs_total, lifts_total, image_url, price_level, description')
          .order('name', { ascending: true });

        console.log('[HolaSki] Response status:', status);
        console.log('[HolaSki] Error:', dbError);
        console.log('[HolaSki] Data length:', data?.length ?? 0);

        if (cancelled) return;

        if (dbError) {
          console.warn('[HolaSki] DB error, using fallback');
          setResorts(FALLBACK_RESORTS);
          setError('Mostrando destinos de ejemplo');
        } else if (!data || data.length === 0) {
          setResorts(FALLBACK_RESORTS);
          setError('Mostrando destinos de ejemplo');
        } else {
          console.log('[HolaSki] Loaded', data.length, 'resorts. First:', data[0]?.name);
          setResorts(data as Resort[]);
        }
      } catch (err) {
        console.error('[HolaSki] Fetch exception:', err);
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
  };

  const priceLabel = (lvl?: number) => {
    if (!lvl) return '—';
    return '$'.repeat(Math.max(1, Math.min(4, lvl)));
  };

  return (
    <div className="min-h-screen bg-navy-900 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-navy-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-end">
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
            <button
              onClick={handleNewSearch}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-2xl px-6 py-3 flex items-center justify-center gap-2 transition-all min-h-[48px]"
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
          </div>
          <div className="mt-3 text-sm text-slate-400">
            {travelers} • {filteredResorts.length} {filteredResorts.length === 1 ? 'resultado' : 'resultados'}
          </div>
        </div>

        {error && !loading && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-sm">
            ⚠ {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-navy-950/50 border border-white/5 rounded-3xl p-6">
                <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-white/5 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse mb-6" />
                <div className="h-10 w-full bg-white/5 rounded-xl animate-pulse" />
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
              onClick={() => setDestFilter('')}
              className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Ver todos los destinos
            </button>
          </div>
        )}

        {!loading && filteredResorts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight truncate">
                      {resort.name}
                    </h3>
                  </div>
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

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white font-bold inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Nueva búsqueda
          </button>
        </div>
      </div>
    </div>
  );
}
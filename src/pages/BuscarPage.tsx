// @ts-nocheck
// src/pages/BuscarPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, Users, Loader2, Star, Hotel as HotelIcon, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatMXN, usdToMxn } from '../lib/format';

interface HotelResult {
  id: string;
  name: string;
  location: string;
  stars: number;
  price_mxn: number;
  image_url: string;
  description: string;
}

const FALLBACK_HOTELS: HotelResult[] = [
  {
    id: 'fb-1',
    name: 'Hotel Valle Nevado',
    location: 'Valle Nevado, Chile',
    stars: 4,
    price_mxn: usdToMxn(320),
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    description: 'Ski-in/ski-out premium con spa y vistas a los Andes.',
  },
  {
    id: 'fb-2',
    name: 'Portillo Grand Hotel',
    location: 'Portillo, Chile',
    stars: 4,
    price_mxn: usdToMxn(280),
    image_url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800',
    description: 'Legendario hotel frente a la Laguna del Inca.',
  },
  {
    id: 'fb-3',
    name: 'Llao Llao Resort',
    location: 'Cerro Catedral, Argentina',
    stars: 5,
    price_mxn: usdToMxn(420),
    image_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
    description: 'Resort icónico en Bariloche con golf y spa.',
  },
];

export default function BuscarPage() {
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [results, setResults] = useState<HotelResult[]>(FALLBACK_HOTELS);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Debounced search (300ms)
  const runSearch = useCallback(async () => {
    if (!query.trim() && !checkIn) {
      setResults(FALLBACK_HOTELS);
      return;
    }

    setLoading(true);
    setNotice(null);

    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: {
          action: 'search-hotels',
          destination: query,
          check_in: checkIn,
          check_out: checkOut,
          guests,
        },
      });

      if (error) throw error;

      if (data?.hotels && Array.isArray(data.hotels) && data.hotels.length > 0) {
        const mapped: HotelResult[] = data.hotels.slice(0, 12).map((h: Record<string, unknown>, i: number) => ({
          id: String(h.code ?? `api-${i}`),
          name: String(h.name ?? 'Hotel'),
          location: String(h.destinationName ?? query),
          stars: Number(h.categoryCode ?? 4),
          price_mxn: usdToMxn(Number(h.minRate ?? 200)),
          image_url: String(h.image ?? FALLBACK_HOTELS[i % 3].image_url),
          description: String(h.description ?? 'Hotel de esquí premium.'),
        }));
        setResults(mapped);
      } else {
        // API returned empty — use fallback but inform user
        setResults(FALLBACK_HOTELS);
        setNotice('Mostrando resultados de muestra. Intenta refinar tu búsqueda.');
      }
    } catch (err) {
      console.error('search error:', err);
      setResults(FALLBACK_HOTELS);
      setNotice('No pudimos conectar con el servicio de reservas. Mostrando opciones destacadas.');
    } finally {
      setLoading(false);
    }
  }, [query, checkIn, checkOut, guests]);

  useEffect(() => {
    const t = setTimeout(runSearch, 400);
    return () => clearTimeout(t);
  }, [query, checkIn, checkOut, guests, runSearch]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3">
            <Search className="w-3 h-3" /> Buscar estancias
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Encuentra tu <span className="text-blue-400">hotel ideal</span>
          </h1>
          <p className="text-white/50 mt-2 text-sm">Precios en pesos mexicanos (MXN) por noche</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 mb-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-1 relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Destino"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[44px]"
              />
            </div>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
              />
            </div>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
              />
            </div>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[44px] appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-slate-900">
                    {n} {n === 1 ? 'huésped' : 'huéspedes'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {notice && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/90">{notice}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((hotel) => (
              <article
                key={hotel.id}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base truncate flex-1">{hotel.name}</h3>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/50 flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </p>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2 break-words">
                    {hotel.description}
                  </p>
                  <div className="flex items-end justify-between pt-3 border-t border-white/5">
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Desde</div>
                      <div className="text-xl font-black text-blue-400">
                        {formatMXN(hotel.price_mxn)}
                      </div>
                      <div className="text-[10px] text-white/40">por noche</div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 min-h-[40px]">
                      <HotelIcon className="w-3.5 h-3.5" />
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No se encontraron resultados. Prueba con otro destino.</p>
          </div>
        )}
      </div>
    </div>
  );
}
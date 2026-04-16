// @ts-nocheck
// src/pages/BuscarPage.tsx
import { useState, useCallback, useMemo } from 'react';
import { Sparkles, AlertTriangle, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { HotelbedsSearchForm } from '../components/search/HotelbedsSearchForm';
import { HotelResultCard } from '../components/search/HotelResultCard';
import { HotelbedsHotel, HotelSearchParams, SKI_DESTINATIONS } from '../lib/hotelbeds';

interface SearchState {
  loading: boolean;
  hotels: HotelbedsHotel[];
  total: number;
  error: string | null;
  searched: boolean;
  params: HotelSearchParams | null;
}

const INITIAL: SearchState = {
  loading: false,
  hotels: [],
  total: 0,
  error: null,
  searched: false,
  params: null,
};

const FALLBACK_HOTELS: HotelbedsHotel[] = [
  { code: 1, name: 'Llao Llao Resort & Spa',      categoryName: '5 ESTRELLAS', destinationName: 'Bariloche',     zoneName: 'Cerro Catedral',      currency: 'MXN', minRate: 8500,  maxRate: 14000 },
  { code: 2, name: 'Valle Nevado Hotel',           categoryName: '4 ESTRELLAS', destinationName: 'Valle Nevado',  zoneName: 'Ski-in/Ski-out',      currency: 'MXN', minRate: 6200,  maxRate: 10500 },
  { code: 3, name: 'Hotel Portillo',               categoryName: '4 ESTRELLAS', destinationName: 'Portillo',      zoneName: 'Laguna del Inca',     currency: 'MXN', minRate: 7400,  maxRate: 12800 },
  { code: 4, name: 'Aspen Mountain Lodge',         categoryName: '5 ESTRELLAS', destinationName: 'Aspen',         zoneName: 'Downtown',             currency: 'MXN', minRate: 11500, maxRate: 19800 },
];

function nightsBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

export default function BuscarPage() {
  const [state, setState] = useState<SearchState>(INITIAL);

  const handleSearch = useCallback(async (params: HotelSearchParams) => {
    setState((s) => ({ ...s, loading: true, error: null, params }));
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'search-hotels', ...params },
      });

      if (error) throw new Error(error.message || 'function_invoke_failed');
      if (data?.error) throw new Error(data.error);

      const hotels: HotelbedsHotel[] = Array.isArray(data?.hotels) ? data.hotels : [];
      setState({
        loading: false,
        hotels,
        total: data?.total ?? hotels.length,
        error: null,
        searched: true,
        params,
      });
    } catch (e) {
      const msg = (e as Error).message;
      console.error('search-hotels failed:', msg);
      setState({
        loading: false,
        hotels: FALLBACK_HOTELS,
        total: FALLBACK_HOTELS.length,
        error: msg,
        searched: true,
        params,
      });
    }
  }, []);

  const nights = useMemo(
    () => (state.params ? nightsBetween(state.params.checkIn, state.params.checkOut) : 7),
    [state.params],
  );

  const destinationName = useMemo(() => {
    if (!state.params) return '';
    const d = SKI_DESTINATIONS.find((x) => x.code === state.params!.destinationCode);
    return d ? `${d.flag} ${d.name}` : state.params.destinationCode;
  }, [state.params]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3 h-3" /> Búsqueda en vivo · Hotelbeds
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Encuentra tu <span className="text-blue-400">refugio</span> en la nieve
          </h1>
          <p className="text-white/50 mt-3 text-sm">Precios en pesos mexicanos (MXN)</p>
        </div>

        {/* Form */}
        <div className="mb-8">
          <HotelbedsSearchForm onSearch={handleSearch} loading={state.loading} />
        </div>

        {/* Results */}
        {state.loading && <LoadingSkeleton />}

        {!state.loading && state.searched && state.error && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-amber-200 text-sm">Mostrando destinos destacados</p>
              <p className="text-xs text-amber-200/70 mt-1 break-words">
                No pudimos conectar con Hotelbeds ahora mismo. Te mostramos una selección curada mientras tanto.
              </p>
              {state.error.startsWith('hotelbeds_not_registered') && (
                <p className="text-xs text-amber-200/70 mt-2">
                  <strong>Admin:</strong> Registra <code className="bg-black/30 px-1 rounded">hotelbeds</code> en <code className="bg-black/30 px-1 rounded">/admin/integrations</code> con <code className="bg-black/30 px-1 rounded">auth=signature</code>.
                </p>
              )}
            </div>
          </div>
        )}

        {!state.loading && state.searched && !state.error && state.hotels.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <Info className="w-10 h-10 text-white/30 mx-auto mb-3" />
            <p className="font-bold">Sin resultados para estas fechas</p>
            <p className="text-sm text-white/50 mt-1">Prueba con otras fechas o un destino diferente.</p>
          </div>
        )}

        {!state.loading && state.hotels.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-5">
              <h2 className="text-xl md:text-2xl font-black">
                {state.total} {state.total === 1 ? 'hotel' : 'hoteles'}
                {destinationName && <span className="text-white/40 font-normal"> · {destinationName}</span>}
              </h2>
              <p className="text-sm text-white/50">{nights} {nights === 1 ? 'noche' : 'noches'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {state.hotels.map((h) => (
                <HotelResultCard key={h.code} hotel={h} nights={nights} />
              ))}
            </div>
          </>
        )}

        {!state.searched && !state.loading && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-white/60 text-sm">Selecciona un destino y fechas para ver disponibilidad en tiempo real.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
          <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
          <div className="h-3 bg-white/10 rounded w-1/2 mb-4" />
          <div className="h-6 bg-white/10 rounded w-24 mb-4" />
          <div className="flex justify-between pt-4 border-t border-white/5">
            <div className="h-8 bg-white/10 rounded w-20" />
            <div className="h-8 bg-white/10 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
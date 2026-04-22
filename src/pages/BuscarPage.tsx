// @ts-nocheck
// src/pages/BuscarPage.tsx
import { useState } from 'react';
import { Search, Hotel, MapPin, Calendar, Users, Loader2, AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface HotelResult {
  code: string | number;
  name: string;
  categoryName?: string;
  destinationName?: string;
  zoneName?: string;
  minRate: number;
  maxRate: number;
  currency?: string;
  latitude?: number;
  longitude?: number;
}

interface SearchResponse {
  hotels: HotelResult[];
  total: number;
  checkIn?: string;
  checkOut?: string;
  source?: string;
}

const MOCK_HOTELS: HotelResult[] = [
  { code: 'mock-1', name: 'Hotel Valle Nevado (ejemplo)', categoryName: '4 ESTRELLAS', destinationName: 'Santiago', zoneName: 'Andes', minRate: 320, maxRate: 520, currency: 'USD' },
  { code: 'mock-2', name: 'Portillo Lodge (ejemplo)', categoryName: '5 ESTRELLAS', destinationName: 'Los Andes', zoneName: 'Cordillera', minRate: 180, maxRate: 380, currency: 'USD' },
];

const formatMoney = (amount: number, currency = 'MXN') => {
  try {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(0)}`;
  }
};

const DESTINATIONS = [
  { code: 'MEN', name: 'Mendoza / Las Leñas (AR)' },
  { code: 'SCL', name: 'Santiago / Valle Nevado (CL)' },
  { code: 'BAR', name: 'Bariloche (AR)' },
  { code: 'DEN', name: 'Denver / Aspen (US)' },
  { code: 'GVA', name: 'Ginebra / Chamonix (CH)' },
  { code: 'INN', name: 'Innsbruck (AT)' },
];

export default function BuscarPage() {
  const [destinationCode, setDestinationCode] = useState('MEN');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HotelResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<unknown>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [usingMock, setUsingMock] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      toast.error('Selecciona las fechas de entrada y salida');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error('La fecha de salida debe ser posterior a la de entrada');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setRawResponse(null);
    setUsingMock(false);
    setSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: {
          action: 'search-hotels',
          destinationCode,
          checkIn,
          checkOut,
          adults,
          children: 0,
          rooms: 1,
          currency: 'MXN',
          language: 'CAS',
        },
      });

      setRawResponse({ data, error });

      if (error) {
        const msg = (error as { message?: string }).message ?? JSON.stringify(error);
        throw new Error(msg);
      }

      if (data && typeof data === 'object' && 'error' in data) {
        const e = data as { error: string; detail?: string };
        throw new Error(e.detail ?? e.error);
      }

      const typed = data as SearchResponse;
      if (!typed?.hotels) {
        throw new Error('Respuesta inesperada del servidor (falta campo "hotels")');
      }

      setResults(typed.hotels);

      if (typed.hotels.length === 0) {
        setErrorMsg(
          `Hotelbeds respondió correctamente pero no hay hoteles disponibles para "${destinationCode}" entre ${checkIn} y ${checkOut}. Prueba con otro destino o fechas diferentes (el entorno de test de Hotelbeds tiene inventario limitado).`
        );
      }
    } catch (e) {
      const msg = (e as Error).message;
      console.error('search-hotels error:', msg);
      setErrorMsg(msg);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setResults(MOCK_HOTELS);
    setUsingMock(true);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
            <Search className="w-3 h-3" /> Inventario en vivo
          </div>
          <h1 className="text-4xl md:text-5xl font-black">
            Buscar <span className="text-blue-400">hoteles</span>
          </h1>
          <p className="text-white/50 mt-2 text-sm">Precios en pesos mexicanos (MXN) — Hotelbeds API</p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Destino
            </label>
            <select
              value={destinationCode}
              onChange={(e) => setDestinationCode(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px]"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.code} value={d.code} className="bg-slate-900">
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Entrada
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Salida
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Users className="w-3 h-3" /> Adultos
            </label>
            <input
              type="number"
              min={1}
              max={8}
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
            />
          </div>

          <div className="md:col-span-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-xl font-bold transition-all min-h-[48px] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Buscando en Hotelbeds...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" /> Buscar hoteles
                </>
              )}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-red-300 mb-1">No se pudo obtener inventario en vivo</h3>
                <p className="text-sm text-red-200/80 break-words mb-3">{errorMsg}</p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDebug((v) => !v)}
                    className="text-xs font-bold bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                  >
                    {showDebug ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {showDebug ? 'Ocultar' : 'Ver'} detalles técnicos
                  </button>
                  <button
                    type="button"
                    onClick={useMockData}
                    className="text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg"
                  >
                    Usar datos de ejemplo
                  </button>
                </div>

                {showDebug && rawResponse !== null && (
                  <pre className="mt-4 text-[11px] bg-black/60 border border-white/10 rounded-lg p-3 overflow-x-auto max-h-64 text-white/70">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                )}

                {errorMsg.includes('hotelbeds_not_registered') && (
                  <div className="mt-4 text-xs bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-yellow-200">
                    <strong>Acción requerida:</strong> El administrador debe abrir el panel de
                    Valinor en <code className="bg-black/40 px-1 rounded">/admin/integrations</code> y
                    registrar el proveedor <code className="bg-black/40 px-1 rounded">hotelbeds</code> con{' '}
                    <code className="bg-black/40 px-1 rounded">auth_type=signature</code>,
                    api_key y secret.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {usingMock && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-sm text-amber-200">
              Mostrando <strong>datos de ejemplo</strong> (no es inventario real). Estos precios son ilustrativos.
            </p>
          </div>
        )}

        {!errorMsg && searched && !loading && results.length > 0 && !usingMock && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-200">
              <strong>{results.length}</strong> hoteles encontrados vía Hotelbeds (inventario en vivo).
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((h) => (
              <div
                key={h.code}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-lg break-words flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">{h.name}</span>
                    </h3>
                    {h.categoryName && (
                      <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{h.categoryName}</p>
                    )}
                  </div>
                </div>

                {(h.destinationName || h.zoneName) && (
                  <p className="text-sm text-white/60 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3 h-3" />
                    {[h.zoneName, h.destinationName].filter(Boolean).join(', ')}
                  </p>
                )}

                <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Desde</p>
                    <p className="text-2xl font-black text-blue-400">
                      {formatMoney(h.minRate, h.currency ?? 'MXN')}
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-bold text-sm">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searched && !loading && !errorMsg && results.length === 0 && !usingMock && (
          <div className="text-center py-12 text-white/40">
            <Hotel className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>No se encontraron hoteles para estos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
}
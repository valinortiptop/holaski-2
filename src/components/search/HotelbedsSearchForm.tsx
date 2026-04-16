// @ts-nocheck
// src/components/search/HotelbedsSearchForm.tsx
import { useState, useEffect, memo } from 'react';
import { Calendar, MapPin, Users, Search, Loader2 } from 'lucide-react';
import { SKI_DESTINATIONS, HotelSearchParams } from '../../lib/hotelbeds';

interface Props {
  onSearch: (params: HotelSearchParams) => void;
  loading: boolean;
  initial?: Partial<HotelSearchParams>;
}

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function HotelbedsSearchFormBase({ onSearch, loading, initial }: Props) {
  const [destinationCode, setDestinationCode] = useState(initial?.destinationCode ?? 'BRC');
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? todayPlus(30));
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? todayPlus(37));
  const [adults, setAdults] = useState(initial?.adults ?? 2);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [rooms, setRooms] = useState(initial?.rooms ?? 1);

  // Guard: checkOut must be after checkIn
  useEffect(() => {
    if (new Date(checkOut) <= new Date(checkIn)) {
      const ci = new Date(checkIn);
      ci.setDate(ci.getDate() + 7);
      setCheckOut(ci.toISOString().slice(0, 10));
    }
  }, [checkIn, checkOut]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destinationCode, checkIn, checkOut, adults, children, rooms });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Destination */}
        <div className="md:col-span-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3 h-3" /> Destino
          </label>
          <select
            value={destinationCode}
            onChange={(e) => setDestinationCode(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[44px] focus:outline-none focus:border-blue-500/50"
          >
            {SKI_DESTINATIONS.map((d) => (
              <option key={d.slug} value={d.code} className="bg-slate-900">
                {d.flag} {d.name} · {d.country}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div className="md:col-span-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3 h-3" /> Entrada
          </label>
          <input
            type="date"
            value={checkIn}
            min={todayPlus(1)}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-3 text-white min-h-[44px] focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {/* Check-out */}
        <div className="md:col-span-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3 h-3" /> Salida
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-3 text-white min-h-[44px] focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {/* Occupancy */}
        <div className="md:col-span-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-1.5 mb-1.5">
            <Users className="w-3 h-3" /> Huéspedes
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="bg-slate-900/80 border border-white/10 rounded-xl px-2 py-3 text-white min-h-[44px] text-sm"
              title="Adultos"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-slate-900">{n}ad</option>
              ))}
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="bg-slate-900/80 border border-white/10 rounded-xl px-2 py-3 text-white min-h-[44px] text-sm"
              title="Niños"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900">{n}ni</option>
              ))}
            </select>
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="bg-slate-900/80 border border-white/10 rounded-xl px-2 py-3 text-white min-h-[44px] text-sm"
              title="Habitaciones"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900">{n}hb</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[44px] md:h-[48px] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-bold text-white flex items-center justify-center transition-all"
            aria-label="Buscar hoteles"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </form>
  );
}

export const HotelbedsSearchForm = memo(HotelbedsSearchFormBase);
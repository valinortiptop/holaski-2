// @ts-nocheck
// src/components/Hero.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Snowflake } from 'lucide-react';
import DestinationSelect from './DestinationSelect';
import { findDestinationLabel } from '../data/destinations';

export default function Hero() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (dates) params.set('dates', dates);
    navigate(`/planear-viaje?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
          alt="Ski mountain"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/70 to-navy-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">Planifica con IA</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            AVENTURA EN NIEVE
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              A TU MEDIDA
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Del Bariloche a los Alpes. Encuentra tu próxima experiencia en la nieve con expertos que saben.
          </p>
        </div>

        {/* Search Card — NOTE: NO overflow-hidden on this card, relative positioning for dropdown */}
        <div className="relative bg-navy-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                <Snowflake className="w-3 h-3" /> Destino
              </label>
              <DestinationSelect
                value={destination}
                onChange={setDestination}
                placeholder="¿A dónde quieres ir?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-400">
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
              Destino seleccionado: <span className="text-blue-400 font-bold">{findDestinationLabel(destination)}</span>
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-3xl mx-auto">
          {[
            { n: '40+', l: 'Destinos' },
            { n: '4.9★', l: 'Calificación' },
            { n: '1000+', l: 'Viajeros' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">{stat.n}</div>
              <div className="text-xs md:text-sm text-slate-400 uppercase tracking-widest mt-1">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
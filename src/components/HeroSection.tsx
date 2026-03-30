// @ts-nocheck
// src/components/HeroSection.tsx
import { Search, Mountain, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/70 via-[#0B1628]/40 to-[#0B1628]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
          <Mountain className="w-4 h-4 text-blue-400" />
          <span className="text-white/90 text-sm font-medium">Temporada 2025–2026 · Reserva Abierta</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight">
          Tu Aventura en la
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Nieve Comienza Aquí
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Paquetes todo incluido a los mejores destinos de esquí del mundo.
          Vuelos, hotel, forfait y más.
        </p>

        {/* Search bar */}
        <div
          id="search"
          className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-2xl p-3 max-w-4xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <label className="absolute -top-0.5 left-3 text-[10px] uppercase tracking-wider text-blue-300 font-semibold">
                Saliendo de
              </label>
              <input
                type="text"
                placeholder="Ciudad de México"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl pt-5 pb-2 px-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
            </div>
            <div className="relative">
              <label className="absolute -top-0.5 left-3 text-[10px] uppercase tracking-wider text-blue-300 font-semibold">
                ¿A dónde?
              </label>
              <input
                type="text"
                placeholder="Whistler, Vail..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl pt-5 pb-2 px-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
            </div>
            <div className="relative">
              <label className="absolute -top-0.5 left-3 text-[10px] uppercase tracking-wider text-blue-300 font-semibold">
                Fechas
              </label>
              <input
                type="text"
                placeholder="Ene 15 – Ene 22"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl pt-5 pb-2 px-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
            </div>
            <div className="relative">
              <label className="absolute -top-0.5 left-3 text-[10px] uppercase tracking-wider text-blue-300 font-semibold">
                Huéspedes
              </label>
              <input
                type="text"
                placeholder="2 adultos"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl pt-5 pb-2 px-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>

        {/* AI Quiz CTA */}
        <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 text-white rounded-full px-6 py-3 transition-all duration-300 hover:-translate-y-0.5">
          <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-medium text-sm">
            ¿No sabes a dónde ir?{' '}
            <span className="text-blue-400 group-hover:text-cyan-300 font-bold transition-colors">Usa AI</span>
          </span>
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B1628] to-transparent" />
    </section>
  );
}
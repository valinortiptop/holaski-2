// @ts-nocheck
// src/components/HeroSection.tsx
import { useState } from 'react';
import { MapPin, Mountain, Calendar, Users, Search } from 'lucide-react';

export default function HeroSection() {
  const [origin, setOrigin] = useState('CDMX');
  const [destination, setDestination] = useState('Whistler');
  const [dates, setDates] = useState('27 de Mar - 4 de Abr');
  const [guests, setGuests] = useState('2');

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 text-shadow-lg leading-tight">
          Diseña tu viaje de esquí ideal
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-8 md:mb-12 text-shadow">
          Nosotros nos ocupamos del resto
        </p>

        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Saliendo de */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="text-left flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Saliendo de</p>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Destino */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <Mountain className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="text-left flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">¿A dónde quieres ir?</p>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Fechas */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="text-left flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Fechas</p>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Huéspedes */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="text-left flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Huéspedes</p>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Buscar */}
            <button className="bg-holaski-blue hover:bg-blue-700 text-white font-bold rounded-xl py-3 px-6 flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-[0.98]">
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>

        {/* Quiz CTA */}
        <div className="mt-6">
          <p className="text-white/80 text-sm mb-3">
            O responde 5 preguntas y crea tu viaje de esquí perfecto.
          </p>
          <button className="bg-white text-holaski-navy font-extrabold text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            HAZ TEST
          </button>
        </div>
      </div>
    </section>
  );
}
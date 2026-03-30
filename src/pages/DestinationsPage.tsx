// @ts-nocheck
// src/pages/DestinationsPage.tsx
import { FALLBACK_RESORTS } from '../data/resorts';
import { Star, MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Nuestros <span className="text-blue-400">Destinos</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explora la selección más exclusiva de resorts de esquí en todo el mundo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FALLBACK_RESORTS.map((r) => (
            <div key={r.id} className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 border border-white/10">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-sm">{r.rating}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-2 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> {r.country}
                </div>
                <h3 className="text-2xl font-bold mb-3">{r.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">Desde</span>
                    <span className="text-white font-bold text-xl">{r.price_from}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95">
                    Ver Detalles <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
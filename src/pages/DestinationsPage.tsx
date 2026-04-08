// @ts-nocheck
import { useState, useEffect } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { fallbackResorts } from '../lib/fallback';

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const resorts = fallbackResorts.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Explora <span className="text-blue-400">Destinos</span></h1>
            <p className="text-white/60">Los mejores centros de esquí del mundo a tu alcance.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            <input 
              type="text" 
              placeholder="Buscar por país o resort..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <div key={resort.id} className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all animate-fade-up">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={resort.image_url} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                  {resort.difficulty === 'advanced' ? 'Avanzado' : resort.difficulty === 'intermediate' ? 'Intermedio' : 'Principiante'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3" />
                  {resort.country}
                </div>
                <h3 className="text-xl font-bold mb-4">{resort.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] text-white/40 uppercase font-bold">Base</span>
                    <span className="text-sm font-bold">{resort.altitude_base_m}m</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] text-white/40 uppercase font-bold">Pistas</span>
                    <span className="text-sm font-bold">{resort.total_runs}</span>
                  </div>
                </div>
                <button className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl text-sm font-bold transition-all min-h-[44px]">Ver Ficha Técnica</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck
import { useState } from 'react';
import { RESORTS } from '../data/resorts';
import ResortCard from '../components/ResortCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function DestinosPage() {
  const [filter, setFilter] = useState('');

  const filteredResorts = RESORTS.filter(r => 
    r.name.toLowerCase().includes(filter.toLowerCase()) || 
    r.country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Destinos <span className="text-blue-500">Premium</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Explora las mejores estaciones de esquí del mundo, seleccionadas por expertos para garantizar una experiencia inigualable.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Buscar por estación o país..."
              className="w-full bg-navy-950 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-navy-800 border border-white/10 rounded-2xl px-8 py-4 text-white font-bold hover:bg-navy-700 transition-colors">
            <SlidersHorizontal className="w-5 h-5" /> Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResorts.map(resort => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>

        {filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-navy-950/50 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-lg">No encontramos estaciones que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
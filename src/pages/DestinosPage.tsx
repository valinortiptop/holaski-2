// @ts-nocheck
import { useState } from 'react';
import { Search, Filter, Snowflake, Trophy, Users } from 'lucide-react';
import { RESORTS } from '../data/resorts';
import ResortCard from '../components/ResortCard';

export default function DestinosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredResorts = RESORTS.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resort.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || resort.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'all', label: 'Todos', icon: Snowflake },
    { id: 'lux', label: 'Lujo VIP', icon: Trophy },
    { id: 'pro', label: 'Expertos', icon: Snowflake },
    { id: 'family', label: 'Familiar', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            EXPLORA EL <span className="text-blue-500">MUNDO</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Desde los glaciares suizos hasta la nieve polvo de Hokkaido. Seleccionamos solo lo mejor de cada continente.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="flex-grow relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Busca por resort o país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-950/50 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  activeFilter === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResorts.map(resort => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>

        {filteredResorts.length === 0 && (
          <div className="text-center py-40">
            <Snowflake className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron destinos</h3>
            <p className="text-slate-500">Prueba ajustando tus filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// @ts-nocheck

import { useEffect, useState } from 'react';
import { Search, Filter, MapPin, ChevronRight, Snowflake, Mountain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Link } from 'react-router-dom';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Todos');

  useEffect(() => {
    async function fetchResorts() {
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .order('name', { ascending: true });
      
      if (!error && data) setResorts(data);
      setLoading(false);
    }
    fetchResorts();
  }, []);

  const regions = ['Todos', ...new Set(resorts.map(r => r.region))];

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resort.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'Todos' || resort.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Explora <span className="text-blue-500">Destinos</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            Desde los glaciares de los Alpes hasta la nieve polvo de Japón. Encuentra el resort perfecto para tu próximo descenso.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Busca por nombre o país..."
              className="w-full bg-navy-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`whitespace-nowrap px-6 py-4 rounded-2xl font-bold transition-all ${
                  selectedRegion === region 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-navy-950 text-slate-400 border border-white/5 hover:border-white/20'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[450px] bg-navy-950/50 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <Link 
                key={resort.id}
                to={`/planear-viaje?dest=${resort.slug}`}
                className="group relative bg-navy-950 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                </div>
                
                <div className="absolute top-6 right-6 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                  {resort.country}
                </div>

                <div className="p-8 relative">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-3 uppercase tracking-widest">
                    <MapPin className="w-4 h-4" /> {resort.region}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors uppercase">
                    {resort.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Mountain className="w-4 h-4 text-blue-500" />
                      <span>{resort.altitude_top}m max</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Snowflake className="w-4 h-4 text-blue-500" />
                      <span>{resort.runs_total} pistas</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div 
                          key={lvl}
                          className={`w-2 h-2 rounded-full ${lvl <= resort.price_level ? 'bg-blue-500' : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-white font-bold text-sm">
                      VER DETALLES <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-white mb-2">No encontramos resultados</h3>
            <p className="text-slate-400">Prueba ajustando tus filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Mountain, Gauge, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const COUNTRIES = ['Todos', 'Francia', 'Suiza', 'Austria', 'Italia', 'USA', 'Argentina'];

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCountry, setActiveCountry] = useState('Todos');

  useEffect(() => {
    async function fetchResorts() {
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .order('name');
      
      if (!error && data) setResorts(data);
      setLoading(false);
    }
    fetchResorts();
  }, []);

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(search.toLowerCase()) || 
                         resort.region.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = activeCountry === 'Todos' || resort.country === activeCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Explora los <span className="text-blue-400">Mejores Destinos</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input 
                type="text"
                placeholder="Buscar estación o región..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* Country Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {COUNTRIES.map(country => (
                <button
                  key={country}
                  onClick={() => setActiveCountry(country)}
                  className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border ${
                    activeCountry === country 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map(resort => (
              <Link 
                key={resort.id}
                to={`/resort/${resort.slug}`}
                className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{resort.country}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{resort.name}</h3>
                    <p className="text-white/40 text-sm">{resort.region}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
                    <div className="text-center">
                      <Mountain className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                      <span className="block text-[10px] text-white/40 uppercase font-bold">Cota Máx</span>
                      <span className="text-sm font-bold">{resort.altitude_top}m</span>
                    </div>
                    <div className="text-center">
                      <Gauge className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                      <span className="block text-[10px] text-white/40 uppercase font-bold">Pistas</span>
                      <span className="text-sm font-bold">{resort.runs_total}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < resort.price_level ? 'bg-blue-400' : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <span className="block text-[10px] text-white/40 uppercase font-bold">Precio</span>
                      <span className="text-sm font-bold">{resort.price_level}/5</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm line-clamp-2 mb-6 flex-grow italic">
                    "{resort.description}"
                  </p>

                  <div className="flex items-center text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">
                    Ver detalles <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold">No se encontraron destinos</h3>
            <p className="text-white/40 mt-2">Prueba ajustando los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
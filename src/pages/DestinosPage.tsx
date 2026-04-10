// @ts-nocheck
import { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, ArrowRight, Mountain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Link } from 'react-router-dom';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchResorts() {
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .order('name');
      
      if (data) setResorts(data);
      setLoading(false);
    }
    fetchResorts();
  }, []);

  const regions = ['Todos', ...new Set(resorts.map(r => r.country))];
  
  const filteredResorts = resorts.filter(r => {
    const matchesRegion = filter === 'Todos' || r.country === filter;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Nuestros <span className="text-blue-500">Destinos</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            Explora nuestra selección exclusiva de los 76 mejores resorts de esquí en los Alpes, América y Asia.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar estación o región..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950/50 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setFilter(region)}
                className={`px-8 py-5 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  filter === region 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-navy-950/50 text-slate-400 border border-white/5 hover:border-white/20'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-navy-950/50 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <Link 
                key={resort.id}
                to={`/planear`}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 transition-transform hover:-translate-y-2"
              >
                <img 
                  src={resort.image_url} 
                  alt={resort.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">{resort.region}, {resort.country}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{resort.name}</h3>
                  
                  <div className="flex gap-4 mb-6 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mountain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold">{resort.altitude_top}m</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm font-bold">{resort.runs_total} Pistas</span>
                    </div>
                  </div>

                  <button className="w-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-navy-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    PLANEAR VIAJE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-navy-950/50 rounded-[3rem] border border-white/5">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No encontramos resultados</h3>
            <p className="text-slate-400">Prueba ajustando tus filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// @ts-nocheck
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { MapPin, Mountain, ArrowRight, Loader2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'Francia' | 'Suiza'>('all');

  useEffect(() => {
    async function fetchResorts() {
      try {
        const { data, error } = await supabase
          .from('resorts')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setResorts(data || []);
      } catch (err) {
        console.error('Error fetching resorts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchResorts();
  }, []);

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(search.toLowerCase()) ||
                         resort.region.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = filter === 'all' || resort.country === filter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Destinos <span className="text-blue-400">Premium</span></h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Explora nuestra selección de las mejores estaciones de esquí en los Alpes franceses y suizos.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text"
              placeholder="Buscar por nombre o región..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-colors min-h-[44px]"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'Francia', 'Suiza'].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c as any)}
                className={`px-6 py-4 rounded-2xl font-bold transition-all min-h-[44px] ${
                  filter === c 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {c === 'all' ? 'Todos' : c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="text-white/40 animate-pulse">Cargando estaciones...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <Link 
                key={resort.id} 
                to={`/destinos/${resort.slug}`}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{resort.region}</span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{resort.name}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < resort.price_level ? 'text-blue-400' : 'text-white/10'}`}>$</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-white/50 text-sm mb-6 line-clamp-2">
                    {resort.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold mb-1">
                        <Mountain className="w-3 h-3" /> Cota Max
                      </div>
                      <div className="text-lg font-black">{resort.altitude_top}m</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-center">
                      <div className="text-white/40 text-[10px] uppercase font-bold mb-1">País</div>
                      <div className="text-lg font-black">{resort.country}</div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-bold flex items-center gap-2">
                      Ver detalles <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="text-white/20 text-xs font-mono">{resort.runs_total} Pistas</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <p className="text-white/40">No se encontraron estaciones que coincidan con tu búsqueda.</p>
            <button 
              onClick={() => {setSearch(''); setFilter('all');}}
              className="mt-4 text-blue-400 font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
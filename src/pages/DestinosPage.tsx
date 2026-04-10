// @ts-nocheck
import { useState, useEffect } from 'react';
import { MapPin, Mountain, Wind, DollarSign, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Resort } from '../types/database';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');

  useEffect(() => {
    async function fetchResorts() {
      try {
        const { data, error } = await supabase
          .from('resorts')
          .select('*')
          .order('name', { ascending: true });
        
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

  const countries = ['Todos', ...new Set(resorts.map(r => r.country))];
  
  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resort.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'Todos' || resort.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            EXPLORA NUESTROS <span className="text-blue-500">DESTINOS</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Desde los glaciares de los Alpes hasta el legendario "Japow". Encuentra la montaña perfecta para tu próximo descenso.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar estación o región..."
              className="w-full bg-navy-950 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                  selectedCountry === country
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-navy-950 border-white/10 text-slate-400 hover:border-white/30'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-navy-950 rounded-[2rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <div 
                key={resort.id}
                className="group relative bg-navy-950 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                    {resort.country}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{resort.name}</h3>
                      <p className="flex items-center gap-1 text-blue-400 font-bold text-sm uppercase">
                        <MapPin className="w-3.5 h-3.5" /> {resort.region}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <DollarSign 
                          key={i} 
                          className={`w-4 h-4 ${i < resort.price_level ? 'text-blue-500' : 'text-slate-700'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {resort.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-navy-900/50 p-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                        <Mountain className="w-3.5 h-3.5" /> Altitud
                      </div>
                      <div className="text-white font-black">{resort.altitude_top}m</div>
                    </div>
                    <div className="bg-navy-900/50 p-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                        <Wind className="w-3.5 h-3.5" /> Pistas
                      </div>
                      <div className="text-white font-black">{resort.runs_total}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.location.href = `/destinos/${resort.slug}`}
                    className="w-full bg-white hover:bg-blue-600 text-navy-950 hover:text-white py-4 rounded-2xl font-black uppercase transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Ver Detalles
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResorts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">No se encontraron estaciones que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
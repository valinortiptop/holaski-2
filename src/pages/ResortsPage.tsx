// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Loader2, ArrowRight } from 'lucide-react';

export default function ResortsPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filtered = resorts.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Explora las <span className="text-blue-400">Estaciones</span>
            </h1>
            <p className="text-white/60 max-w-xl">
              Descubre los mejores destinos para esquiar en Europa y el mundo. Datos actualizados de pistas, remontes y dificultad.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text"
              placeholder="Buscar estación o país..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(resort => (
              <Link 
                key={resort.id}
                to={`/resort/${resort.slug}`}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:scale-[1.02]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <MapPin className="w-3 h-3 text-blue-400" /> {resort.country}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{resort.name}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < resort.price_level ? 'bg-blue-400' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm line-clamp-2 mb-6">
                    {resort.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Pistas</div>
                        <div className="text-sm font-black">{resort.runs_total}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Cota Max</div>
                        <div className="text-sm font-black">{resort.altitude_top}m</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
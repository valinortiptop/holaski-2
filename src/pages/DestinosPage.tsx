// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Loader2, ThermometerSnowflake } from 'lucide-react';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filtered = resorts.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            DESTINOS <span className="text-blue-500">GLOBALES</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
            Explora las mejores estaciones de esquí en Europa, América y Asia.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Busca por estación o región..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-navy-950 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((resort) => (
              <div 
                key={resort.id} 
                className="group bg-navy-950/50 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all hover:translate-y-[-8px]"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={resort.image_url} 
                    alt={resort.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-400" /> {resort.country}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{resort.name}</h3>
                      <p className="text-blue-400 font-bold text-sm uppercase">{resort.region}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className={`text-xl font-black ${i < (resort.price_level || 0) ? 'text-white' : 'text-white/20'}`}>$</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                    {resort.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <ThermometerSnowflake className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300 font-bold text-sm">{resort.vertical_drop} Drop</span>
                    </div>
                    <button className="text-blue-400 font-black text-sm uppercase hover:text-white transition-colors">
                      Ver Detalles →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
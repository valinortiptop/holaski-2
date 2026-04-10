// @ts-nocheck
import { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Mountain, Layers, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Resort } from '../types/database';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredResorts = resorts.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-navy-950">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">DESTINOS DE ÉLITE</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            Explora nuestra selección curada de las mejores estaciones de esquí del mundo, 
            desde los Alpes hasta las Rocosas y Japón.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
            <input 
              type="text"
              placeholder="Buscar estación, región o país..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-[500px] bg-white/5 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <div 
                key={resort.id}
                className="group relative bg-navy-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={resort.image_url || 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2052&auto=format&fit=crop'} 
                    alt={resort.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <span className="text-sm font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      {'$'.repeat(resort.price_level)}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4" />
                    {resort.region}, {resort.country}
                  </div>
                  <h3 className="text-3xl font-black mb-4">{resort.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mountain className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-500">Altitud</p>
                        <p className="font-bold">{resort.altitude_top}m</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Wind className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-500">Pistas</p>
                        <p className="font-bold">{resort.runs_total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-tighter text-slate-500">Dificultad de Terreno</p>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500" style={{ width: `${resort.difficulty_json?.beginner || 30}%` }} />
                      <div className="bg-blue-500" style={{ width: `${resort.difficulty_json?.intermediate || 40}%` }} />
                      <div className="bg-black border border-white/20" style={{ width: `${resort.difficulty_json?.advanced || 30}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>VERDE</span>
                      <span>AZUL/ROJO</span>
                      <span>NEGRO</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-white/5 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all border border-white/10 hover:border-blue-500">
                    VER DETALLES
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
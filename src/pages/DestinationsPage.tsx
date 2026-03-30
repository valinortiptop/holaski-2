// @ts-nocheck
// src/pages/DestinationsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Mountain, ArrowRight, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FALLBACK_RESORTS, Resort } from '../data/resorts';

export default function DestinationsPage() {
  const navigate = useNavigate();
  const [resorts, setResorts] = useState<Resort[]>(FALLBACK_RESORTS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const countries = ['Todos', ...new Set(FALLBACK_RESORTS.map(r => r.country))];

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase.from('ski_resorts').select('*');
        if (data?.length) {
          setResorts(data.map((d, i) => ({ ...FALLBACK_RESORTS[i], ...d })));
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const filtered = resorts.filter(r => {
    const matchCountry = filter === 'Todos' || r.country === filter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.country.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explora Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Destinos</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Los mejores resorts de esquí del mundo, seleccionados para ti.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar destino..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {countries.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${filter === c ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{c}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white/5 rounded-2xl animate-shimmer" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(r => (
              <div key={r.id} onClick={() => navigate(`/destinos/${r.id}`)} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {r.rating && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 text-sm font-medium">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{r.rating}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mb-1">{r.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-300"><MapPin className="w-3.5 h-3.5" />{r.country}</div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{r.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-gray-500">
                      {r.runs && <span>{r.runs} pistas</span>}
                      {r.lifts && <span>{r.lifts} lifts</span>}
                      {r.elevation && <span><Mountain className="w-3 h-3 inline" /> {r.elevation}</span>}
                    </div>
                    <span className="text-blue-400 font-bold">{r.price_from || 'Desde $1,999'}</span>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 rounded-xl py-2.5 text-sm font-medium transition">
                    Ver Detalles <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <Mountain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin resultados</h3>
            <p className="text-gray-400">Intenta con otro filtro o búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// @ts-nocheck
// src/pages/DestinosPage.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Mountain, TrendingUp, DollarSign, Loader2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');

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

  const countries = ['All', ...new Set(resorts.map(r => r.country))];

  const filteredResorts = resorts.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                         (r.region?.toLowerCase().includes(search.toLowerCase()));
    const matchesCountry = countryFilter === 'All' || r.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4">Explora <span className="text-blue-400">Destinos</span></h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Descubre las mejores estaciones de esquí del mundo. Desde los Alpes hasta las Rocosas y los Andes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar estación o región..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setCountryFilter(country)}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                  countryFilter === country 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                {country === 'All' ? 'Todos' : country}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResorts.map(resort => (
            <Link 
              to={`/destinos/${resort.slug}`} 
              key={resort.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:scale-[1.02] flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={resort.image_url || 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800'} 
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1">
                      <MapPin className="w-3 h-3" /> {resort.country}
                    </div>
                    <h3 className="text-xl font-bold">{resort.name}</h3>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <DollarSign key={i} className={`w-3 h-3 ${i < resort.price_level ? 'text-blue-400' : 'text-white/20'}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <p className="text-white/60 text-sm line-clamp-2">
                  {resort.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 pt-4 mt-auto">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase mb-1">
                      <Mountain className="w-3 h-3" /> Altitud
                    </div>
                    <div className="text-sm font-bold">{resort.altitude_top}m</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase mb-1">
                      <TrendingUp className="w-3 h-3" /> Pistas
                    </div>
                    <div className="text-sm font-bold">{resort.runs_total} km</div>
                  </div>
                </div>
                
                <button className="w-full bg-white/5 py-3 rounded-xl text-sm font-bold group-hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" /> Ver Detalles
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-xl font-bold text-white/60">No se encontraron destinos</p>
            <p className="text-white/40">Prueba con otros términos de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
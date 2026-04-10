// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Search, MapPin, Wind, Mountain, Loader2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

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

  const countries = ['all', ...Array.from(new Set(resorts.map(r => r.country)))];

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(search.toLowerCase()) ||
                         resort.region.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || resort.country === selectedCountry;
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
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-black mb-4">Explora <span className="text-blue-400">Destinos</span></h1>
          <p className="text-white/60 text-lg">Descubre las mejores estaciones de esquí del mundo, desde los Alpes hasta los Andes.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o región..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500/50 transition-all text-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                selectedCountry === country 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {country === 'all' ? 'Todos los Destinos' : country}
              <span className="ml-2 opacity-40 text-[10px]">
                ({country === 'all' ? resorts.length : resorts.filter(r => r.country === country).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResorts.map((resort) => (
          <Link 
            key={resort.id}
            to={`/resort/${resort.slug}`}
            className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={resort.image_url} 
                alt={resort.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                  <Globe className="w-3 h-3 text-blue-400" /> {resort.country}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3" />
                  {resort.region}
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors mb-2">
                  {resort.name}
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Mountain className="w-4 h-4 text-white/40" />
                    <span>{resort.altitude_top}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Wind className="w-4 h-4 text-white/40" />
                    <span>{resort.runs_total} pistas</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/50 text-sm line-clamp-2 leading-relaxed">
                {resort.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredResorts.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/40 font-medium">No se encontraron destinos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}
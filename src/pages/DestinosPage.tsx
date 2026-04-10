// @ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Mountain, Gauge, ArrowRight, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Resort } from '../types/database';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');

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

  const countries = useMemo(() => {
    const list = ['Todos', ...new Set(resorts.map(r => r.country))];
    return list.sort();
  }, [resorts]);

  const filteredResorts = useMemo(() => {
    return resorts.filter(resort => {
      const matchesSearch = resort.name.toLowerCase().includes(search.toLowerCase()) || 
                           resort.region.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = selectedCountry === 'Todos' || resort.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [resorts, search, selectedCountry]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">
              Explora nuestros <span className="text-blue-400">Destinos</span>
            </h1>
            <p className="text-white/60 max-w-xl text-lg">
              Descubre las mejores estaciones de esquí del mundo, desde los Alpes hasta los Andes y Japón.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-blue-400">{filteredResorts.length}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40">Estaciones disponibles</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text"
              placeholder="Buscar por nombre o región..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                  selectedCountry === country 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResorts.map((resort) => (
            <Link 
              key={resort.id}
              to={`/resort/${resort.slug}`}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={resort.image_url} 
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-1 text-blue-400 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{resort.region}, {resort.country}</span>
                    </div>
                    <h3 className="text-xl font-black">{resort.name}</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-3 rounded-full ${i < resort.price_level ? 'bg-blue-400' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-sm text-white/60 line-clamp-2 min-h-[40px]">
                  {resort.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Mountain className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Pistas</span>
                    </div>
                    <div className="text-sm font-black">{resort.runs_total}km</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Gauge className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Cota Max</span>
                    </div>
                    <div className="text-sm font-black">{resort.altitude_top}m</div>
                  </div>
                  <div className="flex items-end justify-end">
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredResorts.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No se encontraron resultados</h3>
            <p className="text-white/40">Prueba ajustando tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

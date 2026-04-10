// @ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Map } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Resort, RegionFilter, DifficultyBreakdown } from '../types/resort';
import ResortCard from '../components/ResortCard';
import ResortCardSkeleton from '../components/ResortCardSkeleton';

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<RegionFilter>('Todos');

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

  const filteredResorts = useMemo(() => {
    return resorts.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                           r.country.toLowerCase().includes(search.toLowerCase());
      
      if (region === 'Todos') return matchesSearch;
      
      const regionMap: Record<string, string> = {
        'Europa': 'Alpes Franceses,Alpes Suizos,Dolomitas,Alpes Italianos,Alpes Austríacos',
        'Norteamérica': 'Colorado,Utah,Wyoming,Montana,British Columbia',
        'Sudamérica': 'Andes Centrales,Patagonia',
        'Asia': 'Hokkaido,Nagano'
      };
      
      const isMatch = regionMap[region]?.includes(r.region);
      return matchesSearch && isMatch;
    });
  }, [resorts, search, region]);

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">
            Mundo <span className="text-blue-500">Ski</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Explora los destinos de invierno más exclusivos del planeta. Desde los Alpes europeos hasta la nieve polvo de Japón.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-[72px] z-30 bg-navy-900/80 backdrop-blur-xl border-y border-white/5 px-4 py-4 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="Buscar por estación o país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-navy-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['Todos', 'Europa', 'Norteamérica', 'Sudamérica', 'Asia'].map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r as RegionFilter)}
                className={`whitespace-nowrap px-6 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 min-h-[44px] ${
                  region === r 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-navy-950 text-slate-400 border border-white/10 hover:border-white/20'
                }`}
              >
                {r === 'Todos' ? <Filter className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                {r}
              </button>
            ))}
          </div>

          <button className="hidden md:flex items-center gap-2 ml-auto px-6 py-4 bg-navy-950 border border-white/10 rounded-2xl text-slate-400 font-bold hover:text-white transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            Más filtros
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <ResortCardSkeleton key={i} />)}
          </div>
        ) : filteredResorts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-navy-950/50 rounded-[3rem] border border-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No encontramos resultados</h3>
            <p className="text-slate-400">Prueba con otra búsqueda o filtro de región.</p>
          </div>
        )}
      </div>

      {/* Quick CTA */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 relative z-10">
            ¿No sabes cuál elegir?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Cuéntanos qué buscas y nosotros diseñamos el viaje perfecto para ti.
          </p>
          <a 
            href="/planear-viaje"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-900 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl relative z-10"
          >
            PLANEAR MI VIAJE
          </a>
        </div>
      </div>
    </div>
  );
}
// @ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Resort } from '../types/database';
import ResortCard from '../components/ResortCard';
import ResortCardSkeleton from '../components/ResortCardSkeleton';

const REGIONS = ['Todos', 'Europa', 'Norteamérica', 'Sudamérica', 'Asia'];

export default function DestinosPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('Todos');

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
        console.error('Error loading resorts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchResorts();
  }, []);

  const filteredResorts = useMemo(() => {
    return resorts.filter(resort => {
      const matchesSearch = resort.name.toLowerCase().includes(search.toLowerCase()) ||
                          resort.country.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = activeRegion === 'Todos' || 
                           resort.region.toLowerCase().includes(activeRegion.toLowerCase()) ||
                           (activeRegion === 'Europa' && (resort.country === 'Francia' || resort.country === 'Suiza' || resort.country === 'Italia'));
      
      return matchesSearch && matchesRegion;
    });
  }, [resorts, search, activeRegion]);

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
              Explora el Mundo
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 animate-slide-up">
              NUESTROS <span className="text-blue-500">DESTINOS</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Desde el polvo legendario de Japón hasta el lujo alpino de Courchevel. 
              Seleccionamos solo los centros de esquí más icónicos del planeta.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-[80px] z-30 bg-navy-900/80 backdrop-blur-xl border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Region Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeRegion === region 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Busca por nombre o país..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ResortCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredResorts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts.map((resort) => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-navy-950/50 rounded-[3rem] border border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase mb-2">No encontramos resultados</h3>
            <p className="text-slate-500">Intenta ajustar tus filtros de búsqueda.</p>
            <button 
              onClick={() => {setSearch(''); setActiveRegion('Todos');}}
              className="mt-8 text-blue-400 font-bold hover:text-blue-300"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 relative z-10">
            ¿NO SABES CUÁL ELEGIR?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
            Nuestros expertos diseñan el viaje perfecto basado en tu nivel de esquí y presupuesto.
          </p>
          <a 
            href="/planear-viaje"
            className="inline-flex items-center gap-3 bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-widest transition-all hover:scale-105 shadow-2xl relative z-10"
          >
            ASESORÍA GRATUITA
          </a>
        </div>
      </section>
    </div>
  );
}
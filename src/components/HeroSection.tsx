// @ts-nocheck
// src/components/HeroSection.tsx
// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Snowflake } from 'lucide-react';
import DestinationSelect from './DestinationSelect';
import { findDestinationLabel } from '../data/destinations';
import { AISearchBar } from './AISearchBar';
import { AISearchResults } from './AISearchResults';
import { supabase } from '../lib/supabase';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  // Optional AI search (kept intact, hidden until invoked)
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (dates) params.set('dates', dates);
    navigate(`/planear-viaje?${params.toString()}`);
  };

  const handleAISearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query },
      });
      if (error) throw error;
      setResults(data?.results ?? []);
    } catch (err) {
      console.error('[HeroSection] AI search error:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy-900">
      {/* Background isolated in its own overflow container so the search card
          above is NOT clipped and the dropdown can extend below the card freely */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover"
          alt="Paisaje de esquí"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-blue-950" />
      </div>

      {/* Content — NO overflow-hidden */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">
              Planifica con IA
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Tu Aventura en la Nieve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
              Comienza Aquí
            </span>
          </h1>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Del Bariloche a los Alpes. Encuentra tu próxima experiencia en la nieve con expertos que saben.
          </p>
        </div>

        {/* Search card — relative positioned anchor for DestinationSelect's
            absolute dropdown. NO overflow-hidden here. */}
        <div className="relative bg-navy-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 md:p-7 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] gap-3 md:gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                <Snowflake className="w-3 h-3" /> Destino
              </label>
              <DestinationSelect
                value={destination}
                onChange={setDestination}
                placeholder="¿A dónde quieres ir?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                Fechas
              </label>
              <input
                type="text"
                placeholder="Ej: Julio 2025"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[56px]"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-2xl px-8 py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl shadow-blue-600/30 min-h-[56px]"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Buscar</span>
              <ArrowRight className="w-5 h-5 md:hidden" />
            </button>
          </div>

          {destination && (
            <div className="mt-4 pt-4 border-t border-white/5 text-sm text-slate-400">
              Destino seleccionado:{' '}
              <span className="text-blue-400 font-bold">
                {findDestinationLabel(destination)}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-12 max-w-3xl mx-auto">
          {[
            { n: '40+', l: 'Destinos' },
            { n: '4.9★', l: 'Calificación' },
            { n: '1000+', l: 'Viajeros' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-white">{stat.n}</div>
              <div className="text-[10px] md:text-sm text-slate-400 uppercase tracking-widest mt-1">
                {stat.l}
              </div>
            </div>
          ))}
        </div>

        {(showResults || isSearching) && (
          <div className="mt-12">
            <AISearchBar onSearch={handleAISearch} isLoading={isSearching} />
            <AISearchResults results={results} isVisible={showResults} />
            {isSearching && (
              <div className="w-full max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-white/5 rounded-2xl border border-white/10"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
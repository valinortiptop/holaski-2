import { useState } from 'react';
import { AISearchBar } from './AISearchBar';
import { AISearchResults } from './AISearchResults';
import { AISearchResult } from '../types/database';
import { supabase } from '../lib/supabase';

export const HeroSection = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAISearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true); // Show immediate UI response
    
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query }
      });

      if (error) throw error;
      setResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
      // Fallback or error state
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-start overflow-hidden">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover" 
          alt="Ski landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-blue-950"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Tu Aventura en la Nieve <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
              Comienza Aquí
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Personaliza tu viaje de esquí perfecto con nuestra IA. Vuelos, hoteles, pases y equipo, todo en un solo lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105 min-h-[44px] min-w-[200px]">
              Planear Mi Viaje
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all min-h-[44px] min-w-[200px]">
              Ver Destinos
            </button>
          </div>
        </div>

        {/* AI Search Section */}
        <div className="w-full">
          <AISearchBar onSearch={handleAISearch} isLoading={isSearching} />
          
          <AISearchResults 
            results={results} 
            isVisible={showResults} 
          />

          {isSearching && (
            <div className="w-full max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white/5 rounded-2xl border border-white/10"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
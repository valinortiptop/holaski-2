// @ts-nocheck
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AISearchBar from '../components/AISearchBar';
import { Star, MapPin, TrendingUp, Info } from 'lucide-react';

export default function HomePage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleAISearch = async (query: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query }
      });
      if (error) throw error;
      setResults(data?.results || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 animate-fade-up">
          Tu próximo destino de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">nieve</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 animate-fade-up-delay-1">
          Utiliza nuestra inteligencia artificial para encontrar el centro de esquí perfecto según tus gustos, nivel y presupuesto.
        </p>

        <div className="animate-fade-up-delay-2 mb-16">
          <AISearchBar onSearch={handleAISearch} isLoading={loading} />
        </div>

        {searched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white/5 rounded-3xl h-96 animate-shimmer" />
              ))
            ) : results.length > 0 ? (
              results.map((resort, idx) => (
                <div 
                  key={resort.id} 
                  className={`group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all anim-card-${idx}`}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={resort.image_url} alt={resort.resort_name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold">{resort.rating}</span>
                    </div>
                    {resort.match_score && (
                      <div className="absolute bottom-4 left-4 bg-blue-600 px-3 py-1 rounded-full border border-blue-400/50">
                        <span className="text-[10px] font-black uppercase tracking-wider">{resort.match_score}% Match</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                      <MapPin className="w-3 h-3" />
                      {resort.country} • {resort.region}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{resort.resort_name}</h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{resort.why_it_matches}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resort.highlights?.map((h: string) => (
                        <span key={h} className="text-[10px] bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-xs text-white/40">Desde <span className="text-white font-bold block text-base">{resort.price_range_usd}</span></div>
                      <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[44px]">Ver Detalles</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold">No encontramos resultados</h3>
                <p className="text-white/40">Intenta con otros términos o filtros.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FALLBACK_RESORTS } from '../data/resorts';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const dates = searchParams.get('dates') || '';
  const guests = searchParams.get('guests') || '2';

  useEffect(() => {
    doSearch();
  }, [query, destination]);

  const doSearch = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query, origin, destination, dates, guests }
      });
      if (data?.results?.length) {
        setResults(data.results);
      } else {
        setResults(FALLBACK_RESORTS.slice(0, 4).map(r => ({
          resort: r.name, country: r.country, description: r.description,
          price_from: r.price_from, duration: '7 noches',
          highlights: ['Ski pass incluido', 'Hotel 4★', 'Traslados'],
          rating: r.rating, image_keyword: r.name
        })));
      }
    } catch {
      setResults(FALLBACK_RESORTS.slice(0, 4).map(r => ({
        resort: r.name, country: r.country, description: r.description,
        price_from: r.price_from, duration: '7 noches',
        highlights: ['Ski pass incluido', 'Hotel 4★', 'Traslados'],
        rating: r.rating
      })));
    }
    setLoading(false);
  };

  const searchTitle = destination || query || 'los mejores destinos';

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Resultados con IA
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Resultados para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{searchTitle}</span>
          </h1>
          <p className="text-gray-400">
            {origin && `Desde ${origin} · `}{dates && `${dates} · `}{guests} viajeros
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white/5 rounded-2xl h-72 animate-shimmer" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin resultados</h3>
            <p className="text-gray-400">Intenta con otro destino o criterio de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 cursor-pointer" onClick={() => navigate('/destinos')}>
                <div className="relative h-48 overflow-hidden">
                  <img src={FALLBACK_RESORTS[i % FALLBACK_RESORTS.length]?.image_url || 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80'} alt={r.resort} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-lg font-bold">{r.resort}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <MapPin className="w-3 h-3" />{r.country}
                    </div>
                  </div>
                  {r.rating && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 text-sm">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{r.rating}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{r.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(r.highlights || []).slice(0, 3).map((h: string, j: number) => (
                      <span key={j} className="text-xs bg-white/10 rounded-full px-3 py-1 text-gray-300">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-blue-400">{r.price_from || 'Desde $1,999'}</span>
                      <span className="text-gray-500 text-sm ml-1">/ persona</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock className="w-3 h-3" />{r.duration || '7 noches'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/planear')} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold transition">
            <Sparkles className="w-4 h-4" /> ¿No encuentras lo que buscas? Usa nuestro planificador AI
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
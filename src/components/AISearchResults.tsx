// @ts-nocheck
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface ResortResult {
  id: string;
  resort_name: string;
  country: string;
  region: string;
  price_range_usd: string;
  difficulty: string;
  highlights: string[];
  rating: number;
  image_url: string;
  match_score: number;
  why_it_matches: string;
}

interface AISearchResultsProps {
  results: ResortResult[];
  isLoading: boolean;
}

export default function AISearchResults({ results, isLoading }: AISearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="h-48 bg-white/10 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-up">
      {results.map((resort, idx) => (
        <div
          key={resort.id || idx}
          className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={resort.image_url}
              alt={resort.resort_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {resort.match_score && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
                {resort.match_score}% MATCH
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              {resort.rating}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1.5">
              <MapPin className="w-3 h-3" />
              {resort.country} · {resort.region}
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{resort.resort_name}</h3>
            <p className="text-sm text-white/40 mb-4 line-clamp-2 italic">"{resort.why_it_matches}"</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {resort.highlights?.slice(0, 3).map((h, i) => (
                <span key={i} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-white/60">
                  {h}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div>
                <span className="block text-[9px] text-white/30 uppercase font-bold tracking-widest">Desde</span>
                <span className="text-base font-bold text-white">{resort.price_range_usd}</span>
              </div>
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white">
                Ver más <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
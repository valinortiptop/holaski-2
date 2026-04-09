// @ts-nocheck
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface ResortResult {
  id: string;
  resort_name: string;
  country: string;
  region: string;
  price_range_usd: string;
  highlights: string[];
  rating: number;
  image_url: string;
  match_score: number;
  why_it_matches: string;
}

export default function AISearchResults({ results, isLoading }: { results: ResortResult[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto px-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
            <div className="h-56 bg-white/10 animate-pulse" />
            <div className="p-8 space-y-4">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className="h-7 w-48 bg-white/10 rounded animate-pulse" />
              <div className="h-12 w-full bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (results.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto px-4 animate-fade-up">
      {results.map((resort, idx) => (
        <div key={resort.id || idx} className="group bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
          <div className="relative h-56 overflow-hidden">
            <img src={resort.image_url} alt={resort.resort_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
            {resort.match_score && (
              <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full border border-blue-400/30">
                {resort.match_score}% RECOMENDADO
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/10">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{resort.rating?.toFixed(1) || '4.5'}
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2"><MapPin className="w-3.5 h-3.5" />{resort.country}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{resort.resort_name}</h3>
            <p className="text-sm text-white/40 mb-6 line-clamp-2 leading-relaxed italic">"{resort.why_it_matches}"</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {resort.highlights?.slice(0, 3).map((h, i) => (
                <span key={i} className="text-[10px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-white/60">{h}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div>
                <span className="block text-[10px] text-white/30 uppercase font-black tracking-widest mb-0.5">Precio est.</span>
                <span className="text-lg font-bold text-white">{resort.price_range_usd}</span>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all shadow-inner">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
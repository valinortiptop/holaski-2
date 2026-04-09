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

interface Props { results: ResortResult[]; }

export default function AISearchResults({ results }: Props) {
  if (results.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto px-4">
      {results.map((r) => (
        <div key={r.id} className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full shadow-2xl">
          <div className="relative h-56 overflow-hidden">
            <img src={r.image_url} alt={r.resort_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
              {r.match_score}% Match
            </div>
          </div>
          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">{r.region}, {r.country}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">{r.rating}</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">{r.resort_name}</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6 italic">"{r.why_it_matches}"</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {r.highlights.slice(0, 3).map(h => (
                <span key={h} className="text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full">{h}</span>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Precio est.</p>
                <p className="text-sm font-bold text-white">{r.price_range_usd}</p>
              </div>
              <button className="bg-white/5 hover:bg-white text-white hover:text-[#0B1628] p-3 rounded-2xl transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

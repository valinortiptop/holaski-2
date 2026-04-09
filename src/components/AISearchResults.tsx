// @ts-nocheck
import { memo } from 'react';
import { Star, MapPin, ArrowRight, Gauge } from 'lucide-react';

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
  difficulty: string;
}

const ResultCard = memo(({ resort }: { resort: ResortResult }) => (
  <div className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">
    <div className="relative h-56 overflow-hidden">
      <img
        src={resort.image_url}
        alt={resort.resort_name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-transparent to-transparent opacity-60" />
      {resort.match_score > 0 && (
        <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full border border-blue-400/30 shadow-lg">
          {resort.match_score}% MATCH
        </div>
      )}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{resort.rating}</span>
        </div>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{resort.resort_name}</h3>
        <div className="flex items-center gap-1 text-white/50 text-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>{resort.region}, {resort.country}</span>
        </div>
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-6 italic border-l-2 border-blue-500/30 pl-4">
        "{resort.why_it_matches}"
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40 uppercase font-bold tracking-wider">Dificultad</span>
          <span className="text-white font-medium capitalize">{resort.difficulty || 'Intermediate'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40 uppercase font-bold tracking-wider">Precio Est.</span>
          <span className="text-blue-400 font-bold">{resort.price_range_usd}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {resort.highlights.slice(0, 3).map((tag, i) => (
          <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <button className="w-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 py-3.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 group/btn">
          Ver Paquete Detallado
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  </div>
));

export default function AISearchResults({ results }: { results: ResortResult[] }) {
  if (results.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {results.map((resort) => (
        <ResultCard key={resort.id} resort={resort} />
      ))}
    </div>
  );
}
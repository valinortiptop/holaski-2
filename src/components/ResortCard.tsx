// @ts-nocheck
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mountain, Wind, ChevronRight } from 'lucide-react';
import type { Resort } from '../types/resort';

interface ResortCardProps {
  resort: Resort;
}

const ResortCard = memo(function ResortCard({ resort }: ResortCardProps) {
  return (
    <Link 
      to={`/destinos/${resort.slug}`}
      className="group relative overflow-hidden rounded-[2rem] bg-navy-950 border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-[480px]"
    >
      <div className="absolute inset-0">
        <img 
          src={resort.image_url || ''} 
          alt={resort.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
      </div>

      <div className="relative mt-auto p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          {resort.country} • {resort.region}
        </div>
        
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-blue-400 transition-colors">
          {resort.name}
        </h3>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
            <Mountain className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-white font-bold text-sm leading-none">{resort.altitude_top}m</span>
            <span className="text-[10px] text-slate-400 uppercase mt-1">Cima</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
            <Wind className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-white font-bold text-sm leading-none">{resort.runs_total}</span>
            <span className="text-[10px] text-slate-400 uppercase mt-1">Pistas</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-2 rounded-full ${i < (resort.price_level || 3) ? 'bg-blue-400' : 'bg-white/20'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 uppercase">Precio</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-black text-sm transition-transform group-hover:translate-x-1">
            VER DESTINO <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
});

export default ResortCard;
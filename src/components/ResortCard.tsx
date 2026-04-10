// @ts-nocheck
import { MapPin, Mountain, Wind, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Resort } from '../types/database';

interface ResortCardProps {
  resort: Resort;
}

export default function ResortCard({ resort }: ResortCardProps) {
  const priceDots = Array(4).fill(0).map((_, i) => i < resort.price_level);

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-navy-950/50 border border-white/5 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={resort.image_url || 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800'} 
          alt={resort.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-end">
        {/* Region Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            {resort.region}
          </span>
          <div className="flex gap-0.5 ml-auto">
            {priceDots.map((active, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-400' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>

        {/* Title & Location */}
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
          {resort.name}
        </h3>
        <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-6">
          <MapPin className="w-4 h-4 text-blue-400" />
          {resort.country}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/10">
          <div className="text-center">
            <Mountain className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-[10px] text-slate-400 uppercase font-bold">Altitud</div>
            <div className="text-white font-black">{resort.altitude_top}m</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-[10px] text-slate-400 uppercase font-bold">Pistas</div>
            <div className="text-white font-black">{resort.runs_total}</div>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-[10px] text-slate-400 uppercase font-bold">Medios</div>
            <div className="text-white font-black">{resort.lifts_total}</div>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/destinos/${resort.slug}`}
          className="w-full flex items-center justify-center gap-2 bg-white text-navy-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-blue-500 hover:text-white"
        >
          Ver Detalles <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
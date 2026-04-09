// @ts-nocheck
import { MapPin, ArrowRight, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Resort } from '../types';

export default function ResortCard({ resort }: { resort: Resort }) {
  return (
    <Link 
      to={`/destinos/${resort.slug}`}
      className="group relative overflow-hidden rounded-3xl bg-navy-950/50 border border-white/10 hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={resort.image_url} 
          alt={resort.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
          <MapPin className="w-3 h-3" />
          {resort.region}, {resort.country}
        </div>
        <h3 className="text-2xl font-black text-white mb-2">{resort.name}</h3>
        
        <div className="flex gap-4 mb-4 text-slate-300 text-sm">
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4 text-slate-400" />
            <span>{resort.runs_total} pistas</span>
          </div>
          <div className="font-bold text-blue-400">
            {'$'.repeat(resort.price_level)}
          </div>
        </div>

        <div className="flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all duration-300">
          Ver detalles <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
// @ts-nocheck
import { MapPin, ArrowRight } from 'lucide-react';
import { Resort } from '../types/database';
import { Link } from 'react-router-dom';

interface ResortCardProps {
  resort: Resort;
}

const ResortCard = React.memo(({ resort }: ResortCardProps) => {
  return (
    <Link 
      to={`/destinos/${resort.slug}`}
      className="group relative h-[500px] overflow-hidden rounded-[2rem] block"
    >
      <img 
        src={resort.image_url} 
        alt={resort.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest mb-2">
          <MapPin className="w-4 h-4" />
          {resort.country}
        </div>
        <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
          {resort.name}
        </h3>
        <p className="text-slate-300 text-sm line-clamp-2 mb-6 max-w-xs">
          {resort.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-center">
              <span className="block text-white font-bold text-lg">{resort.stats.slopes}</span>
              <span className="block text-xs text-slate-400 uppercase font-bold">Pistas</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <span className="block text-white font-bold text-lg">{resort.stats.altitude.split(' - ')[1]}</span>
              <span className="block text-xs text-slate-400 uppercase font-bold">Altura</span>
            </div>
          </div>
          
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ResortCard;
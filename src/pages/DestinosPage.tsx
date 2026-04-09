// @ts-nocheck
import { Link } from 'react-router-dom';
import { MapPin, Snowflake, Wind, Activity } from 'lucide-react';
import { RESORTS } from '../data/resorts';

export default function DestinosPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">Nuestros<br />Destinos</h1>
          <p className="text-xl text-slate-400">Desde los Alpes franceses hasta el polvo de Hokkaido, hemos seleccionado los resorts más espectaculares del mundo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {RESORTS.map((resort) => (
            <Link 
              key={resort.id} 
              to={`/destinos/${resort.slug}`}
              className="group bg-navy-950/50 rounded-[3rem] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={resort.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase mb-2">{resort.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-widest">
                      <MapPin size={14} className="text-blue-500" /> {resort.region}, {resort.country}
                    </div>
                  </div>
                  <span className="text-3xl">{resort.flag}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Snowflake size={16} className="text-blue-500" />
                    <span className="text-sm font-bold">{resort.slopes_km}km pistas</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Activity size={16} className="text-blue-500" />
                    <span className="text-sm font-bold">{resort.altitude_top}m altura</span>
                  </div>
                </div>

                <p className="text-slate-400 mb-10 line-clamp-2 leading-relaxed">
                  {resort.description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-blue-400 font-black uppercase tracking-widest text-xs">Ver detalles</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= resort.price_level ? 'bg-blue-500' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
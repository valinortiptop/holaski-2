// @ts-nocheck
import { Link } from 'react-router-dom'
import { MapPin, Snowflake, Wind } from 'lucide-react'
import { RESORTS } from '../data/resorts'

export default function DestinosPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">Nuestros <span className="text-blue-500">Destinos</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Desde la nieve polvo de Hokkaido hasta la elegancia de los Alpes Suizos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESORTS.map((resort) => (
            <Link 
              key={resort.id} 
              to={`/destinos/${resort.slug}`}
              className="group bg-navy-950/50 rounded-[2rem] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={resort.imageUrl} alt={resort.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-navy-950/80 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-xs">
                  {resort.flag} {resort.country}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">
                  <MapPin className="w-4 h-4" /> {resort.region}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">{resort.name}</h3>
                <p className="text-slate-400 mb-6 line-clamp-2">{resort.desc}</p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-white/60 text-sm font-bold">
                    <Snowflake className="w-4 h-4 text-blue-500" /> {resort.slopesKm}km
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm font-bold">
                    <Wind className="w-4 h-4 text-blue-500" /> {resort.altitudeTop}m
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
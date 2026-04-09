// @ts-nocheck
import { useParams, Link } from 'react-router-dom'
import { RESORTS } from '../data/resorts'
import { ArrowLeft, Snowflake, Wind, MapPin, CheckCircle } from 'lucide-react'

export default function DestinoDetailPage() {
  const { slug } = useParams()
  const resort = RESORTS.find(r => r.slug === slug)

  if (!resort) return <div className="min-h-screen bg-navy-900 flex items-center justify-center">Destino no encontrado</div>

  return (
    <div className="bg-navy-900 min-h-screen">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img src={resort.imageUrl} alt={resort.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        <div className="absolute top-32 left-0 right-0 max-w-7xl mx-auto px-6">
          <Link to="/destinos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
            <ArrowLeft className="w-5 h-5" /> VOLVER A DESTINOS
          </Link>
          <div className="flex items-center gap-3 text-blue-400 font-black tracking-widest text-sm uppercase mb-4">
            <MapPin className="w-5 h-5" /> {resort.region}, {resort.country} {resort.flag}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">{resort.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-navy-950/80 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem]">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Sobre el Resort</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">{resort.longDesc}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-navy-900/50 rounded-2xl">
                  <Snowflake className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-white font-black text-2xl">{resort.slopesKm}km</p>
                  <p className="text-slate-500 text-xs font-bold uppercase">Pistas</p>
                </div>
                <div className="text-center p-6 bg-navy-900/50 rounded-2xl">
                  <Wind className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-white font-black text-2xl">{resort.altitudeTop}m</p>
                  <p className="text-slate-500 text-xs font-bold uppercase">Cima</p>
                </div>
                {/* Add more stats... */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-navy-950/80 p-10 rounded-[2.5rem] border border-white/5">
                <h3 className="text-2xl font-black text-white mb-6 uppercase">Highlights</h3>
                <ul className="space-y-4">
                  {resort.highlights.map(h => (
                    <li key={h} className="flex items-center gap-3 text-slate-300 font-medium">
                      <CheckCircle className="w-5 h-5 text-blue-500" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-navy-950/80 p-10 rounded-[2.5rem] border border-white/5">
                <h3 className="text-2xl font-black text-white mb-6 uppercase">Ideal para</h3>
                <div className="flex flex-wrap gap-2">
                  {resort.bestFor.map(b => (
                    <span key={b} className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/20">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-blue-600 p-10 rounded-[2.5rem] text-white">
              <h3 className="text-3xl font-black mb-4">¿QUIERES IR A {resort.name.toUpperCase()}?</h3>
              <p className="text-blue-100 mb-8 font-medium">Nuestros expertos diseñarán tu itinerario perfecto incluyendo vuelos, hotel y forfaits.</p>
              <Link to="/planear" className="block w-full bg-white text-blue-600 text-center py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-colors">
                PEDIR PRESUPUESTO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
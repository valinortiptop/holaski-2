// @ts-nocheck
import { Link } from 'react-router-dom'
import { ChevronRight, Snowflake, MapPin, Star } from 'lucide-react'
import { RESORTS } from '../data/resorts'

export default function HomePage() {
  return (
    <div className="bg-navy-900">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-50 scale-105"
            alt="Snow hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/20 via-navy-950/60 to-navy-900"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8 anim-1">
            <Snowflake className="w-4 h-4" /> La Nieve Te Espera
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter anim-2">
            EL MUNDO A TUS <span className="text-blue-500">ESQUÍS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium anim-3">
            Diseñamos viajes de esquí personalizados en los Alpes, Rocosas y Japón. Lujo, aventura y la mejor nieve del planeta.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 anim-4">
            <Link to="/planear" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20">
              COMENZAR MI VIAJE
            </Link>
            <Link to="/destinos" className="w-full md:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-lg transition-all border border-white/10">
              VER DESTINOS
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Destinos de <span className="text-blue-500">Leyenda</span></h2>
              <p className="text-slate-400 text-lg">Seleccionamos solo los mejores resorts del mundo para tu próxima aventura.</p>
            </div>
            <Link to="/destinos" className="hidden md:flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
              VER TODOS <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESORTS.slice(0, 3).map((resort) => (
              <Link key={resort.id} to={`/destinos/${resort.slug}`} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                <img src={resort.imageUrl} alt={resort.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4" /> {resort.region}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">{resort.name}</h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm font-bold">
                    <span>{resort.slopesKm}km Pistas</span>
                    <span>{resort.flag} {resort.country}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
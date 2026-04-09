// @ts-nocheck
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mountain, Wind, MapPin, Snowflake, Calendar, CheckCircle2, Star, ChevronRight } from 'lucide-react'
import { RESORTS } from '../data/resorts'

export default function DestinoDetailPage() {
  const { slug } = useParams()
  const resort = RESORTS.find(r => r.slug === slug)

  if (!resort) return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Destino no encontrado</h1>
        <Link to="/destinos" className="text-blue-500 flex items-center gap-2 justify-center">
          <ArrowLeft className="w-5 h-5" /> Volver a destinos
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src={resort.imageUrl}
          alt={resort.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/destinos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver a Destinos
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] mb-4">
                  <span>{resort.flag}</span>
                  <span>{resort.country}</span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>{resort.region}</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                  {resort.name}
                </h1>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/planear"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20"
                >
                  RESERVAR AHORA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stats Bar */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Pistas', value: `${resort.slopesKm}km`, icon: Mountain },
              { label: 'Remontes', value: resort.lifts, icon: Wind },
              { label: 'Cota Máx.', value: `${resort.altitudeTop}m`, icon: Snowflake },
              { label: 'Temporada', value: resort.season, icon: Calendar },
            ].map((stat, i) => (
              <div key={i} className="bg-navy-950/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-12 mt-8">
            <section>
              <h2 className="text-3xl font-black text-white uppercase mb-6 tracking-tight">Experiencia</h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {resort.longDesc}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-white uppercase mb-8 tracking-tight">Puntos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resort.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-4 bg-navy-950/50 border border-white/5 p-6 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-white font-bold text-lg">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-white uppercase mb-8 tracking-tight">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resort.galleryUrls.map((url, i) => (
                  <img key={i} src={url} className="w-full h-48 object-cover rounded-2xl hover:opacity-80 transition-opacity cursor-pointer" alt="Gallery" />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8 mt-8">
            <div className="bg-navy-950/80 backdrop-blur-xl border border-blue-500/20 p-8 rounded-[2.5rem] sticky top-32">
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Datos Técnicos</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-sm font-black text-slate-500 uppercase mb-2">
                    <span>Fiabilidad de Nieve</span>
                    <span>{resort.snowReliability}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${resort.snowReliability}%` }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-black text-slate-500 uppercase">Dificultad de Pistas</div>
                  <div className="flex h-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${resort.difficulty.green}%` }} />
                    <div className="bg-blue-500 h-full" style={{ width: `${resort.difficulty.blue}%` }} />
                    <div className="bg-red-500 h-full" style={{ width: `${resort.difficulty.red}%` }} />
                    <div className="bg-black h-full" style={{ width: `${resort.difficulty.black}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase text-slate-500">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Verdes ({resort.difficulty.green}%)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Azules ({resort.difficulty.blue}%)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Rojas ({resort.difficulty.red}%)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-black" /> Negras ({resort.difficulty.black}%)</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="text-sm font-black text-slate-500 uppercase mb-4">Recomendado para</div>
                <div className="flex flex-wrap gap-2">
                  {resort.bestFor.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white uppercase">{item}</span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/planear'}
                className="w-full mt-8 bg-white text-navy-900 py-5 rounded-2xl font-black text-lg hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                SOLICITAR PRESUPUESTO <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
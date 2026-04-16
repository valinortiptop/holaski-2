// @ts-nocheck
// src/pages/HomePage.tsx
import { Link } from 'react-router-dom'
import { TrendingUp, ChevronRight, Sparkles, MapPin } from 'lucide-react'
import ReviewsSection from '../components/ReviewsSection'
import SmartSearchBar from '../components/SmartSearchBar'

const featuredResorts = [
  {
    id: 1,
    name: 'Cerro Catedral',
    location: 'Bariloche, Argentina',
    image: 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/cerro-catedral-home.webp',
    price: 'MXN 8,500',
    status: 'Abierto',
    snowDepth: '120cm',
    slug: 'cerro-catedral',
  },
  {
    id: 2,
    name: 'Las Leñas',
    location: 'Mendoza, Argentina',
    image: 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/las-lenas-home.webp',
    price: 'MXN 9,800',
    status: 'Nieve en polvo',
    snowDepth: '185cm',
    slug: 'las-lenas',
  },
  {
    id: 3,
    name: 'Valle Nevado',
    location: 'Santiago, Chile',
    image: 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/valle-nevado-home.webp',
    price: 'MXN 11,200',
    status: 'Gran Nivel',
    snowDepth: '150cm',
    slug: 'valle-nevado',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551698618-1fed5d978204?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Snow mountain"
            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=2000' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-100">Planificador IA · Temporada 2025</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
            TU PRÓXIMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AVENTURA</span> EN NIEVE
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Hoteles reales, paquetes armados con IA y pronósticos en tiempo real para tu viaje perfecto.
          </p>

          <SmartSearchBar />
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest text-xs uppercase mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Destinos Tendencia</span>
            </div>
            <h2 className="text-4xl font-black">RESORTS DESTACADOS</h2>
          </div>
          <Link to="/resorts" className="group flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors">
            Ver todos los destinos
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResorts.map(resort => (
            <Link
              key={resort.id}
              to={`/resorts/${resort.slug}`}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2"
            >
              <div className="relative h-64">
                <img
                  src={resort.image}
                  alt={resort.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=800' }}
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-xs font-bold text-blue-400">{resort.status}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 px-3 py-1 rounded-lg">
                  <span className="text-xs font-black text-white">{resort.snowDepth} Base</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{resort.name}</h3>
                <div className="flex items-center text-white/50 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {resort.location}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-white/60 text-sm">Desde</span>
                  <span className="text-xl font-black text-blue-400">{resort.price} <span className="text-xs font-normal text-white/40">/día</span></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ReviewsSection />

      {/* AI Planner Promo */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full"><circle cx="200" cy="200" r="150" fill="white" /></svg>
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            <div>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Planificador Inteligente</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Deja que nuestra IA organice tu viaje</h2>
              <p className="text-blue-50 text-lg mb-10 opacity-90">
                Solo dinos tu nivel, presupuesto y con quién viajas. Generaremos un itinerario personalizado con hoteles reales y las mejores tarifas.
              </p>
              <Link to="/planner" className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-colors shadow-xl">
                Probar Planificador Gratis
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['100%', 'Personalizado'], ['15+', 'Resorts Analizados'], ['LIVE', 'Estado de Pistas'], ['24/7', 'Soporte IA']].map(([val, label], i) => (
                <div key={label} className={`bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 ${i % 2 === 1 ? 'translate-y-8' : ''}`}>
                  <div className="text-3xl font-black text-white mb-2">{val}</div>
                  <div className="text-blue-100 text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
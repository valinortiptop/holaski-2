// @ts-nocheck
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Star, ShieldCheck } from 'lucide-react';
import { RESORTS } from '../data/resorts';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Ski Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Temporada 2024/25</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
              LA NIEVE<br />COMO NUNCA<br /><span className="text-blue-500">LA VISTE</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-xl leading-relaxed">
              Viajes de esquí a medida en los destinos más exclusivos de los Alpes, las Rocosas y Japón.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/planear" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg uppercase transition-all flex items-center justify-center gap-2">
                Empezar Mi Plan <ChevronRight />
              </Link>
              <Link to="/destinos" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-lg uppercase transition-all flex items-center justify-center">
                Ver Destinos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Destinos VIP', val: '50+' },
            { label: 'Años Experiencia', val: '15+' },
            { label: 'Viajeros Felices', val: '2k+' },
            { label: 'Hoteles 5*', val: '120+' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors">{stat.val}</div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">Destinos Destacados</h2>
              <p className="text-slate-400">Selección de las mejores estaciones para esta temporada.</p>
            </div>
            <Link to="/destinos" className="hidden md:flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest hover:text-white transition-colors">
              Explorar Todos <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESORTS.slice(0, 3).map((resort) => (
              <Link to={`/destinos/${resort.slug}`} key={resort.id} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden">
                <img src={resort.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/20" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase text-white tracking-widest">
                      {resort.country}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-2 tracking-tighter">{resort.name}</h3>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin size={16} /> <span className="text-sm">{resort.region}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
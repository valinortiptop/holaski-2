// @ts-nocheck
import { Link } from 'react-router-dom';
import { Compass, Calendar, Mountain, Users, ChevronRight, Star } from 'lucide-react';
import { resorts } from '../data/resorts';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&q=80"
            alt="Ski Hero"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-900" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            TU PRÓXIMA <br />
            <span className="text-blue-400 italic">AVENTURA</span> EN LA NIEVE
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium">
            Agencia experta en viajes de esquí a medida. Los mejores destinos de Europa, EE.UU. y Sudamérica a un clic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/planear-viaje"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-blue-900/40"
            >
              Planea Tu Viaje Gratis
            </Link>
            <Link
              to="/destinos"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold transition-all"
            >
              Explorar Destinos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">DESTINOS DESTACADOS</h2>
              <div className="h-1.5 w-24 bg-blue-500 rounded-full" />
            </div>
            <Link to="/destinos" className="hidden md:flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
              Ver todos <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resorts.slice(0, 3).map((resort) => (
              <Link key={resort.id} to={`/destinos/${resort.slug}`} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 p-8 w-full">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white text-sm font-bold">{resort.rating}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{resort.name}</h3>
                  <p className="text-slate-300 font-medium mb-4">{resort.country} • {resort.region}</p>
                  <div className="flex flex-wrap gap-2">
                    {resort.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase">¿POR QUÉ VIAJAR CON NOSOTROS?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Hacemos que tu única preocupación sea disfrutar de la nieve.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Compass, title: 'Expertos Locales', desc: 'Conocemos cada pista y cada rincón de los mejores centros.' },
              { icon: Calendar, title: 'Todo Organizado', desc: 'Vuelos, hoteles, forfaits y traslados sin complicaciones.' },
              { icon: Mountain, title: 'Destinos Top', desc: 'Acceso exclusivo a los resorts más premium del mundo.' },
              { icon: Users, title: 'Atención 24/7', desc: 'Estamos contigo antes, durante y después de tu viaje.' }
            ].map((feature, i) => (
              <div key={i} className="bg-navy-900/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
// @ts-nocheck
import { RESORTS } from '../data/resorts';
import ResortCard from '../components/ResortCard';
import { ArrowRight, ChevronRight, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-sm uppercase tracking-widest mb-8">
              <Star className="w-4 h-4 fill-current" /> Experiencias de Nieve Premium
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase tracking-tighter">
              LA MONTAÑA <br />
              <span className="text-blue-500 italic">TUYA</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-xl leading-relaxed">
              Diseñamos viajes de esquí a medida en los destinos más exclusivos del mundo. Desde los Alpes hasta Hokkaido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/planear" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group">
                DISEÑA TU VIAJE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/destinos" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-lg transition-all text-center">
                VER DESTINOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Destinos Globales', value: '25+' },
              { label: 'Años de Experiencia', value: '12' },
              { label: 'Viajeros Felices', value: '10k+' },
              { label: 'Hoteles Partners', value: '150+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-blue-500 font-bold uppercase tracking-widest text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="py-32 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">Selección Exclusiva</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter">DESTINOS DESTACADOS</h2>
            </div>
            <Link to="/destinos" className="flex items-center gap-2 text-white font-bold hover:text-blue-500 transition-colors uppercase tracking-widest group">
              Explorar Todos <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESORTS.slice(0, 3).map((resort) => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-32 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-12 leading-[1.1] uppercase tracking-tighter">
                ¿POR QUÉ ELEGIR <br /><span className="text-blue-500">SNOW TRAVEL?</span>
              </h2>
              <div className="space-y-12">
                {[
                  { 
                    icon: Shield, 
                    title: 'Seguridad Total', 
                    desc: 'Seguros premium especializados en deportes de invierno incluidos en todos nuestros paquetes.' 
                  },
                  { 
                    icon: Clock, 
                    title: 'Soporte 24/7', 
                    desc: 'Tu propio concierge disponible en todo momento durante tu estancia para lo que necesites.' 
                  },
                  { 
                    icon: Star, 
                    title: 'Acceso VIP', 
                    desc: 'Reservas prioritarias en restaurantes, escuelas de esquí y pases rápidos para remontes.' 
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-[3rem] blur-2xl group-hover:bg-blue-500/30 transition-all" />
              <img 
                src="https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&q=80" 
                className="relative rounded-[2.5rem] w-full h-[600px] object-cover border border-white/10"
                alt="Value prop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Snowflake className="absolute top-10 left-10 w-40 h-40" />
              <Snowflake className="absolute bottom-10 right-10 w-60 h-60" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 relative z-10 uppercase tracking-tighter">
              ¿LISTO PARA TU PRÓXIMA <br /> AVENTURA?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto relative z-10">
              Déjanos diseñar el itinerario perfecto para ti. Recibe una propuesta personalizada en menos de 24 horas.
            </p>
            <Link 
              to="/planear" 
              className="inline-block bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-navy-900 hover:text-white transition-all relative z-10 shadow-2xl"
            >
              EMPEZAR AHORA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
// @ts-nocheck
import { ArrowRight, Mountain, Shield, Star, Users, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Snow"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="inline-block animate-fade-in-up px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-sm mb-6 tracking-widest uppercase">
            Temporada 2024/25 Abierta
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up animate-delay-100">
            EL ESQUÍ COMO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">NUNCA LO VISTE</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium animate-fade-in-up animate-delay-200">
            Experiencias de esquí personalizadas en los destinos más exclusivos del mundo. De los Alpes a Japón.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Link 
              to="/planear"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20"
            >
              DISEÑA TU VIAJE
            </Link>
            <Link 
              to="/destinos"
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-2xl font-black text-lg transition-all"
            >
              EXPLORAR DESTINOS
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-navy-900 border-y border-white/5 py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2"><Shield className="w-5 h-5" /><span className="font-black">SEGURIDAD TOTAL</span></div>
          <div className="flex items-center gap-2"><Star className="w-5 h-5" /><span className="font-black">PREMIUM SERVICE</span></div>
          <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span className="font-black">EXPERT GUIDES</span></div>
          <div className="flex items-center gap-2"><Mountain className="w-5 h-5" /><span className="font-black">EPIC TERRAIN</span></div>
        </div>
      </div>

      {/* Feature Section */}
      <section className="py-24 px-4 bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Por qué elegir HolaSki</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 uppercase tracking-tighter">
                MÁS QUE UN VIAJE, <br /> UNA MISIÓN
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                No vendemos paquetes, diseñamos expediciones. Cada montaña tiene un secreto y nosotros conocemos todos. Expertos locales, logística de primer nivel y acceso exclusivo.
              </p>
              <ul className="space-y-6">
                {[
                  'Itinerarios adaptados a tu nivel técnico',
                  'Los mejores hoteles ski-in/ski-out',
                  'Concierge disponible 24/7 en destino',
                  'Gestión completa de equipos y forfaits'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold text-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl" alt="Ski 1" />
                <img src="https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl" alt="Ski 2" />
              </div>
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl" alt="Ski 3" />
                <img src="https://images.unsplash.com/photo-1502675135487-e971002a6adb?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl" alt="Ski 4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
            <Snowflake className="w-96 h-96 text-white rotate-12" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">¿LISTO PARA TU PRÓXIMA AVENTURA?</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto relative z-10">
            Habla con uno de nuestros especialistas hoy mismo y recibe una propuesta personalizada en menos de 24 horas.
          </p>
          <Link 
            to="/planear"
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-2xl relative z-10"
          >
            EMPEZAR AHORA <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
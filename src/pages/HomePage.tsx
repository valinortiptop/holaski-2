// @ts-nocheck
import { ArrowRight, Star, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESORTS } from '../data/resorts';
import ResortCard from '../components/ResortCard';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551632432-c735e82404ed?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Hero mountain"
          />
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-950/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6 block animate-in fade-in slide-in-from-left-4 duration-700">
              Expertos en Experiencias de Nieve
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-tight mb-8 tracking-tighter animate-in fade-in slide-in-from-left-6 duration-1000">
              ESQUÍA SIN <br />
              <span className="text-blue-500">LÍMITES.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000">
              Diseñamos viajes personalizados a las estaciones más exclusivas del mundo. Desde los Alpes hasta las Rocosas, tu aventura comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Link 
                to="/planear" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/30"
              >
                PLANEAR VIAJE <ArrowRight className="w-6 h-6" />
              </Link>
              <Link 
                to="/destinos" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center border border-white/20 transition-all hover:scale-105"
              >
                VER DESTINOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-32 bg-navy-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                Estaciones <span className="text-blue-500">Destacadas</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Una selección de nuestros destinos favoritos para esta temporada. Calidad de nieve, servicios premium y experiencias únicas.
              </p>
            </div>
            <Link to="/destinos" className="text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2">
              VER TODOS LOS DESTINOS <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESORTS.slice(0, 4).map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-32 bg-navy-950 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: 'Confianza Total', desc: 'Expertos certificados y atención 24/7 durante todo tu viaje.' },
              { icon: Zap, title: 'Acceso VIP', desc: 'Pases de montaña sin filas y acceso exclusivo a clubes de esquí.' },
              { icon: Star, title: 'Solo lo Mejor', desc: 'Curaduría exhaustiva de hoteles, chalets y gastronomía.' },
              { icon: Globe, title: 'Global Reach', desc: 'Más de 50 destinos en 4 continentes con soporte local.' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">
            ¿LISTO PARA TU PRÓXIMA AVENTURA?
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
            Deja que nuestros expertos diseñen el viaje perfecto para ti. Presupuesto sin compromiso en menos de 24h.
          </p>
          <Link 
            to="/planear" 
            className="inline-block bg-navy-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-navy-950 transition-all shadow-2xl"
          >
            SOLICITAR PROPUESTA
          </Link>
        </div>
      </section>
    </div>
  );
}
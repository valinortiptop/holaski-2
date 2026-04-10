// @ts-nocheck
import { ArrowRight, Snowflake, Globe, Shield, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-navy-900">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/80 to-navy-900 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Hero background"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <span className="inline-block bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom duration-700">
              Temporada 2024/25
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
              ESQUÍ SIN <br />
              <span className="text-blue-500">LÍMITES.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Viajes personalizados a las montañas más impresionantes del mundo. Desde los Alpes hasta Japón, diseñamos tu invierno perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              <Link 
                to="/planear-viaje"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-2xl shadow-blue-600/30 group"
              >
                PLANEAR MI VIAJE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/destinos"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-10 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all"
              >
                VER DESTINOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                <Globe className="text-blue-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Acceso Global</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Conectamos los mejores resorts en los 5 continentes con logística premium.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                <Shield className="text-blue-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Seguridad Total</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Guías certificados y seguros de alta montaña incluidos en cada paquete.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                <Trophy className="text-blue-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Calidad Elite</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Hoteles boutique y servicios exclusivos a pie de pista (Ski-in/Ski-out).</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
              <Snowflake className="w-full h-full rotate-12" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">¿Listo para tu próxima aventura?</h2>
              <p className="text-blue-100 text-xl md:text-2xl mb-12 font-medium">Déjanos diseñar el itinerario de tus sueños sin costo adicional.</p>
              <Link 
                to="/planear-viaje"
                className="bg-white text-blue-600 px-10 py-6 rounded-2xl font-black text-xl inline-flex items-center gap-3 hover:bg-navy-900 hover:text-white transition-all transform hover:scale-105"
              >
                SOLICITAR PRESUPUESTO <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// @ts-nocheck
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover scale-105"
            alt="Mountains"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/60 to-navy-950" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.4em] mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
              Luxury Ski Experiences
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-150">
              ALCANZA LA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">CÚMBRE</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
              Diseñamos viajes de esquí a medida en los destinos más exclusivos del planeta. Del hotel a la pista, sin complicaciones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link 
                to="/planear-viaje"
                className="group flex items-center justify-center gap-3 bg-white text-navy-950 px-10 py-6 rounded-2xl font-black text-xl hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
              >
                PLANEAR VIAJE <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Link>
              <Link 
                to="/destinos"
                className="flex items-center justify-center gap-3 bg-navy-900/50 backdrop-blur-md border border-white/10 text-white px-10 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all"
              >
                EXPLORAR DESTINOS
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/50" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-navy-950 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Destinos Globales', val: '50+' },
              { label: 'Clientes VIP', val: '2.5k' },
              { label: 'Años de Experiencia', val: '15' },
              { label: 'Satisfaction Rate', val: '100%' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-5xl md:text-7xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors">{stat.val}</p>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-tight">
                POR QUÉ VIAJAR <br /> CON NOSOTROS
              </h2>
              
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="h-16 w-16 shrink-0 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/30">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">Curación Experta</h3>
                    <p className="text-slate-400 text-lg">Solo trabajamos con los mejores hoteles ski-in/ski-out y guías certificados de la región.</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="h-16 w-16 shrink-0 bg-white rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform shadow-lg shadow-white/10">
                    <Zap className="w-8 h-8 text-navy-950" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">Atención 24/7</h3>
                    <p className="text-slate-400 text-lg">Tu concierge personal está disponible en todo momento para cualquier cambio o imprevisto.</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="h-16 w-16 shrink-0 bg-navy-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">Garantía Summit</h3>
                    <p className="text-slate-400 text-lg">Seguros de cancelación y nieve garantizada en destinos seleccionados para tu tranquilidad.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2052&auto=format&fit=crop" 
                  alt="Luxury cabin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 rounded-[3rem] -z-10 blur-[100px] opacity-20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
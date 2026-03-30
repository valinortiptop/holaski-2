// @ts-nocheck
// src/pages/HomePage.tsx
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Mountain, Shield, Sparkles } from 'lucide-react';
import { FALLBACK_RESORTS } from '../data/resorts';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Featured Destinations */}
      <section className="py-24 bg-[#0B1628]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4">Destinos Destacados</div>
              <h2 className="text-4xl md:text-5xl font-bold">Los Mejores <span className="italic font-serif">Resorts</span></h2>
            </div>
            <button 
              onClick={() => navigate('/destinos')}
              className="group flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              Explorar Todos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FALLBACK_RESORTS.map((r) => (
              <div 
                key={r.id} 
                onClick={() => navigate(`/destinos`)}
                className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl"
              >
                <img src={r.image_url} alt={r.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 border border-white/10">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-sm">{r.rating}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-1 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" /> {r.country}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{r.name}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-gray-300 text-sm">Desde <span className="text-white font-bold text-base">{r.price_from}</span></span>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-600/40">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#060D1A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Por qué viajar con <span className="text-blue-500">HolaSki</span>?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Expertos en nieve, lujo y experiencias personalizadas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Seguridad Total', desc: 'Asistencia 24/7 y seguros especializados para deportes de invierno.' },
              { icon: Mountain, title: 'Expertos Locales', desc: 'Conocemos cada pista y cada rincón de los resorts que ofrecemos.' },
              { icon: Star, title: 'Servicio Premium', desc: 'Desde hoteles 5 estrellas hasta transporte privado y concierge.' },
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTORED: Promo CTA Section */}
      <section className="py-24 bg-[#0B1628] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-blue-600 group">
            {/* Background with parallax effect */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1600&q=80" 
                alt="Adventure" 
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600/80 to-transparent" />
            </div>

            <div className="relative z-10 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  Oferta de Temporada
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  ¿Listo para tu próxima <span className="text-blue-200">Aventura</span>?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Reserva hoy y obtén un 15% de descuento en tu primer paquete de esquí personalizado.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => navigate('/planear')}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl"
                  >
                    Planear Mi Viaje
                  </button>
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="bg-transparent border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
                  >
                    Hablar con un Experto
                  </button>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-white/10 backdrop-blur-2xl rounded-[3rem] rotate-12 flex items-center justify-center border border-white/20 animate-pulse">
                   <Mountain className="w-32 h-32 text-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
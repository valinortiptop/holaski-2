// @ts-nocheck
// src/pages/HomePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Calendar, Sparkles } from 'lucide-react';
import DestinationSelect from '../components/DestinationSelect';
import DestinationsSection from '../components/DestinationsSection';
import ExperienceSection from '../components/ExperienceSection';
import PackagesSection from '../components/PackagesSection';
import ReviewsSection from '../components/ReviewsSection';
import CTASection from '../components/CTASection';

export default function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2 viajeros');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (dates) params.set('dates', dates);
    if (travelers) params.set('travelers', travelers);
    navigate(`/planear-viaje?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80"
            alt="Montaña nevada"
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/75 to-navy-900" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">
                Planifica con IA
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
              TU PRÓXIMA
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                AVENTURA EN NIEVE
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
              Hoteles reales, paquetes armados con IA y pronósticos en tiempo real para tu viaje perfecto.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-navy-950/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-[1.3] relative md:border-r md:border-white/10 px-2">
                <DestinationSelect
                  value={destination}
                  onChange={setDestination}
                  placeholder="¿A dónde quieres ir?"
                />
              </div>

              <div className="flex-1 relative md:border-r md:border-white/10 flex items-center px-5">
                <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Elige tus fechas"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full bg-transparent text-white placeholder:text-slate-400 focus:outline-none min-h-[48px]"
                />
              </div>

              <div className="flex-1 relative flex items-center px-5 md:border-r md:border-white/10">
                <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mr-3" />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                >
                  <option className="bg-navy-900">1 viajero</option>
                  <option className="bg-navy-900">2 viajeros</option>
                  <option className="bg-navy-900">3 viajeros</option>
                  <option className="bg-navy-900">4 viajeros</option>
                  <option className="bg-navy-900">5+ viajeros</option>
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black uppercase tracking-wider rounded-full px-8 py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl shadow-blue-600/30 min-h-[56px] whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
            {[
              { n: '40+', l: 'Destinos' },
              { n: '4.9★', l: 'Calificación' },
              { n: '1000+', l: 'Viajeros' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white">{stat.n}</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-widest mt-1">
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DestinationsSection />
      <ExperienceSection />
      <PackagesSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}
// src/components/Hero.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buscar?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80" 
          alt="Ski Resort" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/40 via-[#0B1628]/60 to-[#0B1628]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2 text-blue-300 text-sm font-medium mb-8 animate-fade-up">
          <Sparkles className="w-4 h-4" />
          Tu próxima aventura en la nieve comienza aquí
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Descubre los Mejores <br />
          Destinos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Esquí</span> del Mundo
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Paquetes exclusivos, resorts de lujo y experiencias diseñadas a tu medida en los Alpes, las Rocallosas y más.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <button onClick={() => navigate('/planear')} className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30">
            Planear Mi Viaje
          </button>
          <button onClick={() => navigate('/destinos')} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
            Ver Destinos
          </button>
        </div>

        {/* Search Bar Glassmorphism */}
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 md:p-2 animate-fade-up shadow-2xl" style={{ animationDelay: '0.4s' }}>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <div className="relative flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 group">
              <MapPin className="w-5 h-5 text-blue-400 mr-3" />
              <div className="text-left flex-1">
                <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Destino</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="¿A dónde quieres ir?" 
                  className="bg-transparent border-none p-0 text-sm focus:ring-0 text-white placeholder-gray-500 w-full"
                />
              </div>
            </div>
            <div className="relative flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <Calendar className="w-5 h-5 text-blue-400 mr-3" />
              <div className="text-left">
                <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Fecha</label>
                <div className="text-sm text-gray-300">Seleccionar fecha</div>
              </div>
            </div>
            <div className="relative flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <Users className="w-5 h-5 text-blue-400 mr-3" />
              <div className="text-left">
                <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Viajeros</label>
                <div className="text-sm text-gray-300">2 Adultos</div>
              </div>
            </div>
            <div className="p-2">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 px-6 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all">
                <Search className="w-5 h-5" /> Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
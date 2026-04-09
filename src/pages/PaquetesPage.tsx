// @ts-nocheck
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Snowflake, Star, ArrowRight, Filter, X, ChevronDown, CheckCircle } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  destination: string;
  country: string;
  flag: string;
  region: string;
  image: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  category: 'Familiar' | 'Aventura' | 'Lujo' | 'Romántico';
  includes: string[];
  highlights: string[];
}

const PACKAGES: Package[] = [
  {
    id: '1', name: 'Lujo en Courchevel', destination: 'Courchevel 1850', country: 'Francia', flag: '🇫🇷', region: 'Alpes Franceses',
    image: 'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=800',
    rating: 4.9, reviews: 128, priceFrom: 3200, currency: 'USD', duration: '7 noches',
    difficulty: 'Avanzado', category: 'Lujo',
    includes: ['Vuelo Business', 'Hotel 5★ Ski-in/out', 'Forfait 6 días', 'Traslados'],
    highlights: ['600km de pistas', 'Restaurantes Michelin', 'Spa de clase mundial']
  },
  {
    id: '2', name: 'Zermatt Explorer', destination: 'Zermatt', country: 'Suiza', flag: '🇨🇭', region: 'Alpes Suizos',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    rating: 4.8, reviews: 95, priceFrom: 2800, currency: 'USD', duration: '6 noches',
    difficulty: 'Intermedio', category: 'Romántico',
    includes: ['Vuelo Economy', 'Hotel boutique', 'Forfait 5 días', 'Guía local'],
    highlights: ['Vistas al Matterhorn', 'Pueblo libre de autos', 'Esquí glaciar']
  },
  {
    id: '3', name: 'Nieve Polvo en Niseko', destination: 'Niseko United', country: 'Japón', flag: '🇯🇵', region: 'Hokkaido',
    image: 'https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9, reviews: 210, priceFrom: 3500, currency: 'USD', duration: '8 noches',
    difficulty: 'Intermedio', category: 'Aventura',
    includes: ['Vuelo Economy', 'Ryokan de lujo', 'Onsen ilimitado', 'Forfait 7 días'],
    highlights: ['Nieve legendaria "Japow"', 'Onsens tradicionales', 'Cultura culinaria']
  },
  {
    id: '4', name: 'Aventura Familiar en Val Gardena', destination: 'Selva di Val Gardena', country: 'Italia', flag: '🇮🇹', region: 'Dolomitas',
    image: 'https://images.unsplash.com/photo-1549166417-431839178221?auto=format&fit=crop&q=80&w=800',
    rating: 4.7, reviews: 84, priceFrom: 1900, currency: 'USD', duration: '7 noches',
    difficulty: 'Principiante', category: 'Familiar',
    includes: ['Alojamiento familiar', 'Ski school niños', 'Forfait 6 días', 'Traslados'],
    highlights: ['Sella Ronda circuit', 'Paisajes UNESCO', 'Excelente gastronomía']
  }
];

const DIFFICULTY_COLORS = {
  Principiante: 'bg-green-500/10 text-green-500 border-green-500/20',
  Intermedio: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Avanzado: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Experto: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function PaquetesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState('Todas');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = activeDifficulty === 'Todas' || pkg.difficulty === activeDifficulty;
      const matchesCategory = activeCategory === 'Todas' || pkg.category === activeCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchTerm, activeDifficulty, activeCategory]);

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Paquetes <span className="text-blue-500">Curados</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Seleccionamos los mejores destinos y servicios para que tu única preocupación sea disfrutar del descenso.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Buscar destino o paquete..."
              className="w-full bg-navy-950/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-navy-950 border border-white/10 rounded-2xl py-5 px-6 text-white font-bold"
          >
            <SlidersHorizontal size={20} /> Filtros
          </button>

          <div className="hidden md:flex gap-4">
            <select 
              className="bg-navy-950 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-blue-500 font-bold appearance-none cursor-pointer min-w-[160px]"
              value={activeDifficulty}
              onChange={(e) => setActiveDifficulty(e.target.value)}
            >
              <option value="Todas">Nivel: Todos</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Experto">Experto</option>
            </select>
            <select 
              className="bg-navy-950 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-blue-500 font-bold appearance-none cursor-pointer min-w-[160px]"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="Todas">Estilo: Todos</option>
              <option value="Familiar">Familiar</option>
              <option value="Aventura">Aventura</option>
              <option value="Lujo">Lujo</option>
              <option value="Romántico">Romántico</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="group bg-navy-950/30 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-black uppercase tracking-widest border border-white/10">
                    {pkg.flag} {pkg.country}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${DIFFICULTY_COLORS[pkg.difficulty]}`}>
                    {pkg.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      <Star size={14} fill="currentColor" />
                      <span className="text-white font-bold text-sm">{pkg.rating}</span>
                      <span className="text-white/40 text-xs">({pkg.reviews})</span>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase leading-none">{pkg.name}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-blue-400 mb-6 font-bold text-sm uppercase tracking-widest">
                  <MapPin size={16} /> {pkg.destination}
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {pkg.includes.slice(0, 3).map((inc, i) => (
                    <span key={i} className="bg-white/5 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {inc}
                    </span>
                  ))}
                  {pkg.includes.length > 3 && <span className="text-[10px] font-bold text-slate-600 self-center">+{pkg.includes.length - 3} más</span>}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{pkg.duration} DESDE</span>
                    <span className="text-3xl font-black text-white">${pkg.priceFrom.toLocaleString()}<span className="text-sm text-slate-500 ml-1">{pkg.currency}</span></span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20 bg-navy-950/30 rounded-[3rem] border border-dashed border-white/10">
            <X className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white uppercase mb-2">No se encontraron resultados</h3>
            <p className="text-slate-500">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] bg-navy-950 flex flex-col p-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-white uppercase">Filtros</h2>
            <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-white/5 rounded-full text-white">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-10">
            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Nivel de Esquí</label>
              <div className="grid grid-cols-2 gap-3">
                {['Todas', 'Principiante', 'Intermedio', 'Avanzado', 'Experto'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setActiveDifficulty(d)}
                    className={`py-4 rounded-2xl font-bold border transition-all ${activeDifficulty === d ? 'bg-blue-600 border-blue-600 text-white' : 'bg-navy-900 border-white/10 text-slate-500'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Estilo de Viaje</label>
              <div className="grid grid-cols-2 gap-3">
                {['Todas', 'Familiar', 'Aventura', 'Lujo', 'Romántico'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`py-4 rounded-2xl font-bold border transition-all ${activeCategory === c ? 'bg-blue-600 border-blue-600 text-white' : 'bg-navy-900 border-white/10 text-slate-500'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowMobileFilters(false)}
            className="mt-auto bg-white text-navy-900 py-5 rounded-2xl font-black uppercase"
          >
            Ver {filteredPackages.length} Resultados
          </button>
        </div>
      )}
    </div>
  );
}
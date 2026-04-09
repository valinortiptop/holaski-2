import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AISearchBar from '../components/AISearchBar';
import AISearchResults from '../components/AISearchResults';
import { Star, ArrowRight, Shield, Zap, Globe, Users, Send } from 'lucide-react';

const FALLBACK_DESTINATIONS = [
  { id: '1', name: 'Val Thorens', country: 'Francia', description: 'La estación más alta de Europa con nieve garantizada.', image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800', rating: 4.8 },
  { id: '2', name: 'Zermatt', country: 'Suiza', description: 'Esquía bajo la sombra del icónico Matterhorn.', image_url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800', rating: 4.9 },
  { id: '3', name: 'Niseko', country: 'Japón', description: 'El paraíso de la nieve polvo y el relax en onsens.', image_url: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800', rating: 4.7 }
];

const FEATURES = [
  { icon: Zap, title: 'IA Generativa', desc: 'Búsquedas semánticas que entienden tus gustos personales.' },
  { icon: Shield, title: 'Seguridad Total', desc: 'Reserva con la tranquilidad de operadores verificados.' },
  { icon: Globe, title: 'Destinos Globales', desc: 'Desde los Alpes hasta los Andes, cubrimos todo el mapa.' },
  { icon: Users, title: 'Soporte 24/7', desc: 'Asistencia especializada en cada paso de tu viaje.' },
];

export default function HomePage() {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('ski_resorts').select('*').limit(3);
        if (data && data.length > 0) {
          setDestinations(data.map((d: any) => ({
            id: d.id, name: d.name, country: d.country,
            description: d.description_es || 'Destino de esquí excepcional.',
            image_url: d.image_url || 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
            rating: 4.5 + Math.random() * 0.5,
          })));
        }
      } catch { /* stay fallback */ }
    })();
  }, []);

  const handleAISearch = useCallback(async (query: string) => {
    setAiLoading(true);
    setHasSearched(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query },
      });
      if (error) throw error;
      setAiResults(data?.results || []);
    } catch (err) {
      console.error('AI Search error:', err);
      setAiResults([]);
    } finally {
      setAiLoading(false);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/60 via-[#0B1628] to-[#0B1628]" />
          <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&q=80" alt="Background" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white animate-fade-up">
              Esquía <span className="text-blue-500">Sin Límites</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-1">
              Encuentra y planifica tu viaje perfecto a la nieve en segundos con nuestro buscador inteligente.
            </p>
          </div>

          <div className="animate-fade-up-delay-2">
            <AISearchBar onSearch={handleAISearch} isLoading={aiLoading} />
          </div>

          {hasSearched && (
            <div id="results" className="pt-8">
              <AISearchResults results={aiResults} isLoading={aiLoading} />
            </div>
          )}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-[#0B1628] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Top Seleccionados</span>
              <h2 className="text-4xl font-black text-white">Destinos Populares</h2>
            </div>
            <Link to="/destinos" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors font-bold text-sm">
              Ver todos los destinos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div key={dest.id} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden">
                <img src={dest.image_url} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">{dest.country.toUpperCase()}</span>
                    <div className="flex items-center gap-1 text-xs text-white/80 font-bold">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {dest.rating.toFixed(1)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white">{dest.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-navy-950 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {FEATURES.map((f, i) => (
            <div key={i} className="space-y-4">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <f.icon className="w-7 h-7 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold text-white">{f.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-8 md:p-16 text-center space-y-8 shadow-2xl shadow-blue-600/20">
          <h2 className="text-3xl md:text-5xl font-black text-white">¿Ofertas en tu bandeja?</h2>
          <p className="text-blue-100 text-lg">Suscríbete para recibir los mejores paquetes de último minuto.</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Tu mejor email" 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg">
              Enviar <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
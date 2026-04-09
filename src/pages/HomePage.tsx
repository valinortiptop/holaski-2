// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AISearchBar from '../components/AISearchBar';
import AISearchResults from '../components/AISearchResults';
import {
  MapPin, Star, ArrowRight, Snowflake, Shield, Zap,
  Globe, Users, Mountain, Send
} from 'lucide-react';

const FALLBACK_DESTINATIONS = [
  {
    id: 'val-thorens',
    name: 'Val Thorens',
    country: 'Francia',
    description: 'La estación más alta de Europa con nieve garantizada toda la temporada.',
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80',
    rating: 4.8,
  },
  {
    id: 'zermatt',
    name: 'Zermatt',
    country: 'Suiza',
    description: 'Esquí de clase mundial con vistas icónicas al Matterhorn.',
    image_url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600&q=80',
    rating: 4.9,
  },
  {
    id: 'niseko',
    name: 'Niseko',
    country: 'Japón',
    description: 'La mejor nieve polvo del mundo combinada con cultura japonesa.',
    image_url: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80',
    rating: 4.7,
  },
  {
    id: 'aspen',
    name: 'Aspen Snowmass',
    country: 'EE.UU.',
    description: 'Lujo, glamour y terreno variado para todos los niveles.',
    image_url: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=600&q=80',
    rating: 4.8,
  },
  {
    id: 'chamonix',
    name: 'Chamonix',
    country: 'Francia',
    description: 'La capital del alpinismo con descensos legendarios.',
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    rating: 4.7,
  },
  {
    id: 'valle-nevado',
    name: 'Valle Nevado',
    country: 'Chile',
    description: 'El mejor esquí de Sudamérica a solo una hora de Santiago.',
    image_url: 'https://images.unsplash.com/photo-1486673748761-a8d18475c757?w=600&q=80',
    rating: 4.5,
  },
];

const FEATURES = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Búsqueda con IA',
    desc: 'Nuestro algoritmo analiza miles de datos para encontrar el resort perfecto para ti.',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Reserva Segura',
    desc: 'Todas las transacciones protegidas. Cancelación flexible en la mayoría de paquetes.',
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: 'Cobertura Global',
    desc: 'Acceso a más de 200 estaciones en 30 países de los 5 continentes.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Soporte Experto',
    desc: 'Un equipo de esquiadores expertos disponible 24/7 para asistirte.',
  },
];

const STATS = [
  { value: '200+', label: 'Resorts' },
  { value: '30', label: 'Países' },
  { value: '15K+', label: 'Viajeros felices' },
  { value: '4.9', label: 'Valoración media' },
];

export default function HomePage() {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('ski_resorts')
          .select('*')
          .limit(6);
        if (!error && data && data.length > 0) {
          setDestinations(data.map(d => ({
            id: d.id,
            name: d.name,
            country: d.country,
            description: d.description_es,
            image_url: d.image_url,
            rating: 4.5 + Math.random() * 0.5,
          })));
        }
      } catch {
        // keep fallback
      }
    };
    fetchDestinations();
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

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await supabase.from('newsletter_subscribers').insert({ email: newsletterEmail });
      setNewsletterSent(true);
    } catch {
      setNewsletterSent(true);
    }
  };

  return (
    <div className="bg-[#0B1628] text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=2000"
            alt="Montañas nevadas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/60 via-[#0B1628]/80 to-[#0B1628]" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Snowflake className="w-6 h-6 text-white" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-8">
              <Mountain className="w-3.5 h-3.5" />
              Temporada 2025–2026 Abierta
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-up">
            Tu Aventura en la
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
              Nieve Comienza Aquí
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
            Descubre los mejores destinos de esquí del mundo. Planifica tu viaje perfecto con inteligencia artificial y reserva todo en un solo lugar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up">
            <Link
              to="/planear"
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 text-white"
            >
              Planear Mi Viaje
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/destinos"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-lg transition-all text-white"
            >
              Ver Destinos
            </Link>
          </div>

          <AISearchBar onSearch={handleAISearch} isLoading={aiLoading} />
          
          {hasSearched && (
            <div id="results" className="scroll-mt-24">
              <AISearchResults results={aiResults} isLoading={aiLoading} />
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-white/5 bg-[#08101C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Destinos Destacados</h2>
            <p className="text-white/50">Explora las estaciones más icónicas de la temporada seleccionadas por nuestros expertos.</p>
          </div>
          <Link to="/destinos" className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Ver todos los destinos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="group relative bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{dest.rating}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  <MapPin className="w-3 h-3" />
                  {dest.country}
                </div>
                <h3 className="text-2xl font-bold mb-3">{dest.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">{dest.description}</p>
                <Link to={`/resort/${dest.id}`} className="inline-flex items-center gap-2 text-sm font-bold hover:text-blue-400 transition-colors">
                  Explorar resort <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-b from-[#08101C] to-[#0B1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Por qué elegir HolaSki?</h2>
            <p className="text-white/50 text-lg">Hacemos que planificar tu viaje a la nieve sea tan emocionante como el primer descenso de la mañana.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/[0.08] transition-all">
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative bg-blue-600 rounded-[3rem] p-12 md:p-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">No te pierdas nada</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto opacity-80">
              Recibe las mejores ofertas, guías exclusivas y alertas de nieve directamente en tu correo.
            </p>

            {newsletterSent ? (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto animate-fade-up">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">¡Ya estás en la lista!</h3>
                <p className="text-blue-100 text-sm opacity-80 mt-2">Pronto recibirás nuestras mejores novedades.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all placeholder:text-blue-100/50"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap">
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
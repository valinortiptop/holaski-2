// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ChevronLeft, Snowflake, Mountain, Hotel, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Destination, Package } from '../types/database';

export default function DestinoDetailPage() {
  const { slug } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestino() {
      try {
        const { data: dest, error: destError } = await supabase
          .from('destinations')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (destError) throw destError;
        setDestination(dest);

        const { data: pkgs, error: pkgsError } = await supabase
          .from('packages')
          .select('*')
          .eq('destination_id', dest.id);
        
        if (pkgsError) throw pkgsError;
        setRelatedPackages(pkgs || []);
      } catch (err) {
        console.error('Error fetching destination details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestino();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!destination) return <div>Destino no encontrado</div>;

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Hero Section */}
      <div className="h-[70vh] relative">
        <img 
          src={destination.image_url || 'https://images.unsplash.com/photo-1551698618-1fed5d975506?auto=format&fit=crop&q=80'} 
          className="w-full h-full object-cover"
          alt={destination.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
        
        <div className="absolute top-32 left-4 md:left-20">
          <Link to="/destinos" className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors font-bold uppercase tracking-widest text-sm">
            <ChevronLeft className="w-5 h-5" /> Volver a Destinos
          </Link>
          <div className="flex items-center gap-2 text-blue-400 mb-4 font-bold uppercase tracking-[0.4em]">
            <MapPin className="w-5 h-5" /> {destination.region}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            {destination.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-navy-950/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem]">
              <h2 className="text-3xl font-black text-white mb-6 uppercase italic">La Experiencia</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {destination.description || 'Descubre un paraíso invernal diseñado para los amantes de la montaña. Pistas impecables, gastronomía de primer nivel y paisajes que cortan la respiración.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Snowflake, label: 'Nieve Powder', desc: 'Calidad Premium' },
                  { icon: Mountain, label: 'Pistas PRO', desc: 'Todos los niveles' },
                  { icon: Hotel, label: 'Lujo Alpino', desc: 'Resorts de elite' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <item.icon className="w-8 h-8 text-blue-500 mb-3" />
                    <div className="font-black text-white text-sm uppercase mb-1">{item.label}</div>
                    <div className="text-slate-500 text-xs font-bold">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {relatedPackages.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-white mb-8 uppercase italic flex items-center gap-4">
                  Paquetes en {destination.name}
                </h2>
                <div className="space-y-6">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-navy-950/50 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/30 transition-all">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase italic mb-2">{pkg.name}</h3>
                        <div className="text-slate-400 font-bold">{pkg.duration_days} Días • Todo Incluido</div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-slate-500 text-xs font-bold uppercase">Desde</div>
                          <div className="text-2xl font-black text-white italic">${pkg.price.toLocaleString()}</div>
                        </div>
                        <Link to={`/paquetes/${pkg.slug}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-600/20">
                          VER PAQUETE
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-blue-600 rounded-[3rem] p-10 text-white">
              <h3 className="text-3xl font-black mb-4 uppercase italic leading-none">¿Listo para volar?</h3>
              <p className="text-blue-100 font-bold mb-8 leading-relaxed">
                Nuestros asesores expertos pueden armar un itinerario a medida para ti en {destination.name}.
              </p>
              <Link 
                to="/planear"
                className="block w-full bg-navy-900 text-white py-5 rounded-2xl font-black text-center hover:bg-navy-800 transition-all flex items-center justify-center gap-3"
              >
                PLANEAR VIAJE <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
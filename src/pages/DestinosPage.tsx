// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Destination } from '../types/database';

export default function DestinosPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setDestinations(data || []);
      } catch (err) {
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm">Explora el Mundo</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 uppercase tracking-tighter italic">
            DESTINOS <span className="text-blue-500">PRO</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Desde los picos icónicos de los Alpes hasta la nieve polvo legendaria de Japón. 
            Seleccionamos solo los mejores centros de esquí del planeta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link 
              key={dest.id}
              to={`/destinos/${dest.slug}`}
              className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-navy-950 border border-white/5 transition-transform hover:-translate-y-2"
            >
              <img 
                src={dest.image_url || 'https://images.unsplash.com/photo-1551698618-1fed5d975506?auto=format&fit=crop&q=80'} 
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 text-blue-400 mb-2 font-bold uppercase tracking-wider text-xs">
                  <MapPin className="w-4 h-4" />
                  {dest.region}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase italic leading-tight group-hover:text-blue-400 transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                  EXPLORAR DESTINO <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
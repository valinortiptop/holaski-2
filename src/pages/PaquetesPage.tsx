// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, ArrowRight, Loader2, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Package } from '../types/database';

export default function PaquetesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*, destination:destinations(*)')
          .order('price');
        
        if (error) throw error;
        setPackages(data || []);
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm">Experiencias All-Inclusive</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mt-4 uppercase tracking-tighter italic">
              PAQUETES <span className="text-blue-500">SKI WEEK</span>
            </h1>
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all self-start">
            <Filter className="w-5 h-5" /> FILTRAR POR DESTINO
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="group bg-navy-950/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-blue-500/30 transition-all"
            >
              <div className="md:w-2/5 relative overflow-hidden">
                <img 
                  src={pkg.image_url || 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?auto=format&fit=crop&q=80'} 
                  alt={pkg.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {pkg.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-current" /> TOP SELLER
                  </div>
                )}
              </div>
              
              <div className="p-8 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-400 mb-2 font-bold uppercase tracking-wider text-xs">
                    {pkg.destination?.name || 'Varios Destinos'}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 uppercase italic leading-tight group-hover:text-blue-400 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                    {pkg.description || 'Una experiencia inolvidable en la montaña con todo incluido para que solo te preocupes por esquiar.'}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <Calendar className="w-4 h-4 text-blue-400" /> {pkg.duration_days} Días
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <Users className="w-4 h-4 text-blue-400" /> 2 Pers.
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-slate-500 text-xs font-bold uppercase block">Desde</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <Link 
                    to={`/paquetes/${pkg.slug}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                  >
                    VER DETALLE <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
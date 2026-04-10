// @ts-nocheck
import { useState, useEffect } from 'react';
import { Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TripPackage } from '../types/database';

export default function PaquetesPage() {
  const [packages, setPackages] = useState<TripPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('trip_packages')
          .select('*');
        
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

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-navy-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm">Viajes Organizados</span>
            <h1 className="text-5xl md:text-7xl font-black mt-4 tracking-tighter">PAQUETES EXCLUSIVOS</h1>
          </div>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed">
            Itinerarios prediseñados por nuestros expertos que incluyen alojamiento, pases y transporte.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1,2,3].map(i => <div key={i} className="h-[600px] bg-white/5 rounded-[3rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className="group relative bg-navy-900 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={pkg.image_url} 
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> {pkg.difficulty}
                    </div>
                  </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pkg.duration_days} Días</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Premium</span>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2 leading-tight">{pkg.name}</h3>
                  <p className="text-blue-400 font-bold mb-8 uppercase text-sm tracking-wider">{pkg.destination}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Desde</p>
                      <p className="text-4xl font-black text-white">${Number(pkg.price_from).toLocaleString()}</p>
                    </div>
                    
                    <button className="h-16 w-16 rounded-2xl bg-white text-navy-950 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform hover:rotate-12">
                      <ArrowRight className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
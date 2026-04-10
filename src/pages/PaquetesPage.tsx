// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TripPackage } from '../types/database';
import { Calendar, Tag, CheckCircle2, Loader2 } from 'lucide-react';

export default function PaquetesPage() {
  const [packages, setPackages] = useState<TripPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('trip_packages')
          .select('*')
          .order('price_from');
        
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
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm">Escapadas Curadas</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tighter uppercase">PAQUETES <span className="text-blue-500">PRO</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Experiencias todo incluido diseñadas por esquiadores para esquiadores.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {packages.map((pkg) => (
              <div key={pkg.id} className="group bg-navy-950 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-blue-500/30 transition-all shadow-2xl">
                <div className="md:w-2/5 relative h-64 md:h-auto">
                  <img src={pkg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.name} />
                  <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-sm uppercase shadow-xl">
                    {pkg.difficulty}
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase mb-3">
                      <Tag className="w-4 h-4" /> {pkg.destination}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{pkg.name}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{pkg.description}</p>
                    
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      {pkg.package_data?.features?.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase mb-1">
                        <Calendar className="w-3.5 h-3.5" /> {pkg.duration_days} Días
                      </div>
                      <div className="text-3xl font-black text-white">
                        <span className="text-blue-500 text-xl">Desde</span> ${pkg.price_from}
                      </div>
                    </div>
                    <button className="bg-white text-navy-900 px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 shadow-xl">
                      RESERVAR
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
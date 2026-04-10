// @ts-nocheck
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, MapPin, Mountain, Wind, Snowflake, Calendar, User } from 'lucide-react';
import type { Resort } from '../types/resort';

export default function DestinoDetailPage() {
  const { slug } = useParams();
  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResort() {
      const { data, error } = await supabase
        .from('resorts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) setResort(data);
      setLoading(false);
    }
    fetchResort();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-navy-900 flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!resort) return <div className="min-h-screen bg-navy-900 pt-32 text-center text-white">Destino no encontrado</div>;

  return (
    <div className="min-h-screen bg-navy-900">
      <div className="relative h-[60vh] md:h-[75vh]">
        <img src={resort.image_url || ''} className="w-full h-full object-cover" alt={resort.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8">
          <Link to="/destinos" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-navy-900/50 backdrop-blur-md px-6 py-3 rounded-2xl font-bold border border-white/10">
            <ChevronLeft className="w-5 h-5" /> VOLVER
          </Link>
        </div>

        <div className="absolute bottom-12 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 text-blue-400 font-bold mb-4 uppercase tracking-[0.2em]">
              <MapPin className="w-5 h-5" /> {resort.country} • {resort.region}
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              {resort.name}
            </h1>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col min-w-[140px]">
                <Mountain className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-2xl font-black text-white">{resort.altitude_top}m</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Altitud Máxima</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col min-w-[140px]">
                <Wind className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-2xl font-black text-white">{resort.runs_total}</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Pistas Totales</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col min-w-[140px]">
                <Snowflake className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-2xl font-black text-white">{resort.lifts_total}</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Medios Elevación</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">Sobre el destino</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {resort.description}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-navy-950/50 border border-white/5 p-8 rounded-[2rem]">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Snowflake className="w-5 h-5 text-blue-400" /> Dificultad
              </h3>
              <div className="space-y-4">
                {Object.entries(resort.difficulty_json || {}).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm font-bold uppercase mb-2">
                      <span className="text-slate-300">{key}</span>
                      <span className="text-white">{val}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-navy-950/50 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-4">¿Listo para viajar?</h3>
              <p className="text-slate-400 mb-8">Nuestros expertos organizan todo por ti: pases, hoteles, vuelos y equipo.</p>
              <Link to="/planear-viaje" className="bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-center transition-all">
                SOLICITAR PRESUPUESTO
              </Link>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="sticky top-32 bg-navy-950 border border-white/5 p-8 rounded-[2.5rem]">
            <h3 className="text-2xl font-black text-white uppercase mb-8">Solicita info</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Nombre" className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="email" placeholder="Email" className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              <button className="w-full bg-white text-navy-950 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-colors">ENVIAR</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
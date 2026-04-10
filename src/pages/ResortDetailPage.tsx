// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Resort } from '../types/database';
import { Loader2, MapPin, Wind, Mountain, Layers, ChevronLeft, Calendar } from 'lucide-react';

export default function ResortDetailPage() {
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (!resort) return <div className="text-center py-40">Estación no encontrada.</div>;

  return (
    <div className="pb-20">
      <div className="relative h-[60vh] md:h-[70vh]">
        <img src={resort.image_url} className="w-full h-full object-cover" alt={resort.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute top-32 left-4 md:left-8">
          <Link to="/resorts" className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors">
            <ChevronLeft className="w-4 h-4" /> Volver
          </Link>
        </div>
        <div className="absolute bottom-12 left-4 md:left-12 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            <MapPin className="w-3 h-3" /> {resort.region}, {resort.country}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">{resort.name}</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">{resort.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Mountain className="w-5 h-5" />} label="Cota Máxima" value={`${resort.altitude_top}m`} />
            <StatCard icon={<Layers className="w-5 h-5" />} label="Pistas" value={resort.runs_total} />
            <StatCard icon={<Wind className="w-5 h-5" />} label="Remontes" value={resort.lifts_total} />
            <StatCard icon={<Calendar className="w-5 h-5" />} label="País" value={resort.country} />
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Dificultad de Pistas</h3>
            <div className="space-y-6">
              <DifficultyBar label="Principiante" percentage={resort.difficulty_json.beginner} color="bg-green-500" />
              <DifficultyBar label="Intermedio" percentage={resort.difficulty_json.intermediate} color="bg-blue-500" />
              <DifficultyBar label="Avanzado" percentage={resort.difficulty_json.advanced} color="bg-red-500" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">¿Quieres ir aquí?</h3>
            <p className="text-white/80 mb-6">Deja que nuestra IA planifique el viaje perfecto a {resort.name}.</p>
            <Link to="/planner" className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Planificar con IA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string | number }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
      <div className="text-blue-400 mb-2">{icon}</div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
}

function DifficultyBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-white/60">{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
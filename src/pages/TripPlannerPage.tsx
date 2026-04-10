// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Calendar, Users, Target, Loader2, CheckCircle2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Resort } from '../types/database';

export default function TripPlannerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [config, setConfig] = useState({
    resort_id: '',
    dates: '',
    travelers: '2',
    level: 'intermediate',
    budget: 'moderate'
  });
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    async function loadResorts() {
      const { data } = await supabase.from('resorts').select('id, name').order('name');
      if (data) setResorts(data);
    }
    loadResorts();
  }, []);

  const generatePlan = async () => {
    if (!config.resort_id) return toast.error('Selecciona una estación');
    setLoading(true);
    try {
      const selectedResort = resorts.find(r => r.id === config.resort_id);
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { 
          action: 'generate-package', 
          destination: selectedResort?.name,
          ...config 
        }
      });
      if (error) throw error;
      setPlan(data);
      setStep(3);
    } catch (err) {
      toast.error('Error al generar el plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3 h-3" /> Planificador IA
          </div>
          <h1 className="text-4xl font-black">Tu viaje <span className="text-blue-400">a medida</span></h1>
        </div>

        {step === 1 && (
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Estación</label>
                <select 
                  value={config.resort_id}
                  onChange={e => setConfig({...config, resort_id: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px]"
                >
                  <option value="">Selecciona estación...</option>
                  {resorts.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Pasajeros</label>
                <select 
                  value={config.travelers}
                  onChange={e => setConfig({...config, travelers: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px]"
                >
                  <option value="1">1 Persona</option>
                  <option value="2">2 Personas</option>
                  <option value="4">4 Personas</option>
                  <option value="6">Grupo 6+</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              disabled={!config.resort_id}
              className="w-full bg-blue-600 disabled:opacity-50 py-4 rounded-xl font-bold transition-all min-h-[44px]"
            >
              Siguiente Paso
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Nivel de Esquí</label>
                <select 
                  value={config.level}
                  onChange={e => setConfig({...config, level: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px]"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Presupuesto</label>
                <select 
                  value={config.budget}
                  onChange={e => setConfig({...config, budget: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px]"
                >
                  <option value="budget">Económico</option>
                  <option value="moderate">Moderado</option>
                  <option value="luxury">Lujo</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-white/5 py-4 rounded-xl font-bold min-h-[44px]">Atrás</button>
              <button 
                onClick={generatePlan} 
                disabled={loading}
                className="flex-[2] bg-blue-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 min-h-[44px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generar Propuesta'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && plan && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl text-center">
              <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¡Propuesta Generada!</h2>
              <p className="text-white/60">Basada en tus preferencias para {plan.resort_name}</p>
            </div>
            <div className="grid gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Total Estimado</h3>
                  <span className="text-2xl font-black text-blue-400">${plan.cost_breakdown?.total_per_person_usd} <span className="text-xs text-white/40">/persona</span></span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/50"><span>Hotel ({plan.hotel?.name})</span><span>${plan.cost_breakdown?.hotel}</span></div>
                  <div className="flex justify-between text-sm text-white/50"><span>Ski Pass</span><span>${plan.cost_breakdown?.ski_pass}</span></div>
                  <div className="flex justify-between text-sm text-white/50"><span>Equipos</span><span>${plan.cost_breakdown?.equipment}</span></div>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="w-full border border-white/10 py-4 rounded-xl font-bold min-h-[44px]">Empezar de nuevo</button>
          </div>
        )}
      </div>
    </div>
  );
}
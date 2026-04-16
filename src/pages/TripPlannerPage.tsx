// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Calendar, Users, Target, Loader2, CheckCircle2, MapPin, ChevronRight, Hotel, Ticket, Gauge } from 'lucide-react';
import { toast } from 'sonner';
import { Resort, GeneratedPlan } from '../types/database';

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
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);

  useEffect(() => {
    async function loadResorts() {
      const { data } = await supabase.from('resorts').select('id, name').order('name');
      if (data) setResorts(data as Resort[]);
    }
    loadResorts();
  }, []);

  const generatePlan = async () => {
    if (!config.resort_id) return toast.error('Selecciona una estación');
    if (!config.dates) return toast.error('Selecciona una fecha');
    
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
      toast.error('Error al generar el plan. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-950 text-white">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] appearance-none"
                >
                  <option value="" className="bg-slate-900">Selecciona estación...</option>
                  {resorts.map(r => <option key={r.id} value={r.id} className="bg-slate-900">{r.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Fecha Estimada</label>
                <input 
                  type="date"
                  value={config.dates}
                  onChange={e => setConfig({...config, dates: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] text-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Pasajeros</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '4', '6'].map(num => (
                    <button
                      key={num}
                      onClick={() => setConfig({...config, travelers: num})}
                      className={`py-3 rounded-xl border transition-all ${config.travelers === num ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                      {num === '6' ? '6+' : num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              disabled={!config.resort_id || !config.dates}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-xl font-bold transition-all min-h-[48px] flex items-center justify-center gap-2"
            >
              Siguiente Paso <ChevronRight className="w-5 h-5" />
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] appearance-none"
                >
                  <option value="beginner" className="bg-slate-900">Principiante</option>
                  <option value="intermediate" className="bg-slate-900">Intermedio</option>
                  <option value="advanced" className="bg-slate-900">Avanzado</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Presupuesto</label>
                <select 
                  value={config.budget}
                  onChange={e => setConfig({...config, budget: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 min-h-[44px] appearance-none"
                >
                  <option value="budget" className="bg-slate-900">Económico</option>
                  <option value="moderate" className="bg-slate-900">Moderado</option>
                  <option value="luxury" className="bg-slate-900">Lujo</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 py-4 rounded-xl font-bold min-h-[48px]">Atrás</button>
              <button 
                onClick={generatePlan} 
                disabled={loading}
                className="flex-[2] bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 min-h-[48px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generar Propuesta
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && plan && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl text-center">
              <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¡Propuesta Generada!</h2>
              <p className="text-white/60">Optimizado para {plan.resort_name}</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-blue-400" /> {plan.hotel.name}
                    </h3>
                    <p className="text-sm text-white/50">{plan.hotel.description}</p>
                  </div>
                  <div className="flex text-yellow-500">
                    {Array.from({length: plan.hotel.stars}).map((_, i) => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50 flex items-center gap-2"><Hotel className="w-4 h-4" /> Alojamiento (est.)</span>
                    <span>${plan.cost_breakdown.hotel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50 flex items-center gap-2"><Ticket className="w-4 h-4" /> Ski Pass</span>
                    <span>${plan.cost_breakdown.ski_pass}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50 flex items-center gap-2"><Gauge className="w-4 h-4" /> Equipos</span>
                    <span>${plan.cost_breakdown.equipment}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="font-bold">Total estimado por persona</span>
                    <span className="text-2xl font-black text-blue-400">${plan.cost_breakdown.total_per_person_usd}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-400" /> Itinerario Sugerido</h3>
                <div className="space-y-4">
                  {plan.itinerary.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                        {item.day}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.activity}</p>
                        <p className="text-xs text-white/50">{item.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 border border-white/10 hover:bg-white/5 py-4 rounded-xl font-bold min-h-[48px]">Empezar de nuevo</button>
              <button className="flex-1 bg-white text-slate-950 hover:bg-white/90 py-4 rounded-xl font-bold min-h-[48px]">Reservar Ahora</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
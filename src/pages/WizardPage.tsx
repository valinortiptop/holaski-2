// src/pages/WizardPage.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function WizardPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState({ experience: 'Intermedio', group: 'Pareja', budget: 'Moderado', region: 'Sudamérica' });

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'generate-trip', ...formData }
      });
      if (error) throw error;
      if (data?.data?.packages) setResults(data.data.packages);
      else setResults([ { resort_name: "Valle Nevado (Fallback)", total_price: 1500, description: "Paquete de ejemplo porque falló la IA." } ]);
    } catch (err) {
      toast.error("Error al generar paquete. Mostrando datos de respaldo.");
      setResults([ { resort_name: "Valle Nevado (Fallback)", total_price: 1500, description: "Paquete generado localmente." } ]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Planificador Inteligente</h2>
      
      {!results && !loading && (
        <form onSubmit={handleGenerate} className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-white/10">
          <div>
            <label className="block mb-2">Nivel de Esquí</label>
            <select value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-slate-800 p-3 rounded-lg">
              <option>Principiante</option><option>Intermedio</option><option>Avanzado</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Grupo</label>
            <select value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} className="w-full bg-slate-800 p-3 rounded-lg">
              <option>Solo</option><option>Pareja</option><option>Familia</option><option>Amigos</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Región Preferida</label>
            <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-slate-800 p-3 rounded-lg">
              <option>Sudamérica</option><option>Norteamérica</option><option>Europa</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold">Generar Paquete Mágico</button>
        </form>
      )}

      {loading && (
        <div className="text-center py-20 animate-pulse">
          <div className="text-6xl mb-4">🏔️</div>
          <h3 className="text-xl">La IA está diseñando tu aventura...</h3>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          <button onClick={() => setResults(null)} className="text-blue-400 underline mb-4">← Volver al formulario</button>
          {results.map((pkg: any, idx: number) => (
            <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-cyan-400">{pkg.resort_name}</h3>
              <p className="text-white/70 my-2">{pkg.description || pkg.resort_description}</p>
              <div className="mt-4 p-4 bg-slate-950 rounded-lg">
                <p><strong>Costo Total Estimado:</strong> USD ${pkg.total_price || pkg.cost_breakdown?.total_per_person_usd || 1500}</p>
              </div>
              <button className="mt-4 bg-green-600 px-6 py-2 rounded-lg font-bold">Guardar Viaje</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
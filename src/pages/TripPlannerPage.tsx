// @ts-nocheck
// src/pages/TripPlannerPage.tsx
import { useState } from 'react';
import { Calendar, Users, MapPin, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function TripPlannerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelers: '2',
    preferences: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Solicitud enviada! Un experto se contactará contigo en menos de 24h.');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B1628]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Diseña tu Viaje Perfecto</h1>
            <p className="text-gray-400">Cuéntanos tus planes y nosotros nos encargamos del resto.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <label className="text-sm font-bold text-gray-400 uppercase mb-2 block tracking-widest">¿A dónde quieres ir?</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Ej: Alpes Suizos, Colorado..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-gray-400 uppercase mb-2 block tracking-widest">Fechas Estimadas</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Diciembre 2024"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                      value={formData.dates}
                      onChange={(e) => setFormData({...formData, dates: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-400 uppercase mb-2 block tracking-widest">Viajeros</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      value={formData.travelers}
                      onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                    >
                      <option value="1">1 Persona</option>
                      <option value="2">2 Personas</option>
                      <option value="4">4 Personas</option>
                      <option value="family">Grupo Familiar</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-400 uppercase mb-2 block tracking-widest">Preferencias Extras</label>
                <textarea 
                  rows={4}
                  placeholder="Ej: Clases de esquí, transporte privado, hotel 5 estrellas..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  value={formData.preferences}
                  onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-blue-600/30"
            >
              <Send className="w-5 h-5" /> Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Send, Calendar, Users, MapPin, Snowflake, CheckCircle2, DollarSign, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PlanearViajePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    adults: 2,
    children: 0,
    skill: 'Intermedio',
    budget: 'Premium',
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('leads').insert({
        first_name: formData.name,
        email: formData.email,
        destination: formData.destination,
        travel_dates: formData.dates,
        passengers_adults: formData.adults,
        passengers_children: formData.children,
        skill_level: formData.skill,
        budget_range: formData.budget,
        message: formData.message
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-navy-950/80 backdrop-blur-2xl rounded-[3rem] p-12 text-center border border-blue-500/30 shadow-2xl">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6 uppercase">¡Solicitud Enviada!</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Nuestros expertos en nieve están revisando tu solicitud. Te enviaremos un itinerario personalizado a <span className="text-white font-bold">{formData.email}</span> en menos de 24 horas.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all"
          >
            VOLVER AL INICIO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 w-16 rounded-full transition-all duration-500 ${s <= step ? 'bg-blue-500' : 'bg-white/10'}`} 
              />
            ))}
          </div>
          <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Tu Viaje de Ensueño</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 uppercase tracking-tighter">DISEÑA TU EXPERIENCIA</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-navy-950/50 backdrop-blur-xl border border-white/5 p-6 md:p-12 rounded-[2.5rem] shadow-2xl">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-white font-bold mb-2">
                    <MapPin className="w-5 h-5 text-blue-400" /> ¿A dónde quieres ir?
                  </label>
                  <select 
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                    required
                  >
                    <option value="">Selecciona una región</option>
                    <option>Alpes Franceses</option>
                    <option>Alpes Suizos</option>
                    <option>Dolomitas (Italia)</option>
                    <option>Colorado (EE.UU.)</option>
                    <option>Andes (Chile/Argentina)</option>
                    <option>Hokkaido (Japón)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-white font-bold mb-2">
                    <Calendar className="w-5 h-5 text-blue-400" /> ¿En qué fechas?
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Febrero 2025"
                    value={formData.dates}
                    onChange={(e) => setFormData({...formData, dates: e.target.value})}
                    className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.destination || !formData.dates}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-xl transition-all"
              >
                Siguiente <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-white font-bold mb-2">
                    <Users className="w-5 h-5 text-blue-400" /> Viajeros
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      min="1"
                      placeholder="Adultos"
                      value={formData.adults}
                      onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
                      className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Niños"
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
                      className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-white font-bold mb-2">
                    <Snowflake className="w-5 h-5 text-blue-400" /> Nivel de Esquí
                  </label>
                  <select 
                    value={formData.skill}
                    onChange={(e) => setFormData({...formData, skill: e.target.value})}
                    className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none appearance-none"
                  >
                    <option>Principiante</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                    <option>Experto / Pro</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white font-bold mb-2">
                  <DollarSign className="w-5 h-5 text-blue-400" /> Nivel de Servicio
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Económico', 'Premium', 'Lujo'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormData({...formData, budget: tier})}
                      className={`py-4 rounded-2xl font-bold border transition-all ${
                        formData.budget === tier 
                        ? 'bg-blue-600 border-blue-500 text-white' 
                        : 'bg-navy-900 border-white/10 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-navy-800 text-white py-5 rounded-2xl font-bold hover:bg-navy-700 transition-all"
                >
                  Atrás
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl transition-all"
                >
                  Casi listo <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="¿Algún detalle adicional? (Preferencia de hotel, requerimientos dietéticos, clases, etc.)"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-navy-800 text-white py-5 rounded-2xl font-bold hover:bg-navy-700 transition-all"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-blue-600/20"
                >
                  {loading ? 'ENVIANDO...' : <><Send className="w-6 h-6" /> RECIBIR PRESUPUESTO</>}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
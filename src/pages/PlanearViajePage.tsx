// @ts-nocheck
import { useState } from 'react';
import { Send, Calendar, Users, MapPin, Snowflake, CheckCircle2 } from 'lucide-react';

export default function PlanearViajePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-navy-800 rounded-3xl p-12 text-center border border-blue-500/30 shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase">¡Solicitud Recibida!</h2>
          <p className="text-slate-400 text-lg mb-8">Un experto en nieve de HolaSki se pondrá en contacto contigo en menos de 24 horas con una propuesta personalizada.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Tu Viaje a Medida</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6">DISEÑA TU EXPERIENCIA</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Completa este breve formulario y prepararemos un presupuesto personalizado sin compromiso.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-navy-950/50 backdrop-blur-xl border border-white/5 p-6 md:p-12 rounded-[2rem] shadow-2xl">
          <div className="space-y-12">
            {/* Step 1: Destination & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white font-bold mb-2">
                  <MapPin className="w-5 h-5 text-blue-400" /> ¿A dónde quieres ir?
                </label>
                <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                  <option>Selecciona una región</option>
                  <option>Alpes Franceses (Francia)</option>
                  <option>Alpes Suizos (Suiza)</option>
                  <option>Dolomitas (Italia)</option>
                  <option>Tirol (Austria)</option>
                  <option>Colorado (EE.UU.)</option>
                  <option>Utah (EE.UU.)</option>
                  <option>British Columbia (Canadá)</option>
                  <option>Andes (Chile/Argentina)</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white font-bold mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" /> ¿En qué fechas?
                </label>
                <input
                  type="text"
                  placeholder="Ej: Febrero 2025"
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Step 2: Passengers & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white font-bold mb-2">
                  <Users className="w-5 h-5 text-blue-400" /> ¿Cuántos viajan?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    min="1"
                    placeholder="Adultos"
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Niños"
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white font-bold mb-2">
                  <Snowflake className="w-5 h-5 text-blue-400" /> Nivel de esquí
                </label>
                <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Principiante</option>
                  <option>Intermedio</option>
                  <option>Avanzado / Experto</option>
                  <option>Varios niveles en el grupo</option>
                </select>
              </div>
            </div>

            {/* Step 3: Contact */}
            <div className="space-y-6 pt-8 border-t border-white/5">
              <h3 className="text-white font-bold text-xl mb-4">Datos de contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  required
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <textarea
                placeholder="Cuéntanos más detalles (preferencia de hotel, servicios adicionales, etc.)"
                rows={4}
                className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/20"
            >
              <Send className="w-6 h-6" /> SOLICITAR PRESUPUESTO GRATIS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
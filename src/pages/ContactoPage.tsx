// @ts-nocheck
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
              HABLEMOS DE <br /> <span className="text-blue-500">NIEVE</span>
            </h1>
            <p className="text-slate-400 text-xl mb-12">
              ¿Tienes alguna pregunta o prefieres una asesoría personalizada por teléfono? Nuestro equipo está listo para ayudarte.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-400">reservas@holaski.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Teléfono</h4>
                  <p className="text-slate-400">+56 9 1234 5678</p>
                  <p className="text-slate-500 text-sm">Lun - Vie: 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Oficina Central</h4>
                  <p className="text-slate-400">Av. Vitacura 2670, Las Condes</p>
                  <p className="text-slate-400">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-950/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-8 uppercase">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-bold text-sm">Nombre</label>
                  <input className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-bold text-sm">Email</label>
                  <input className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Asunto</label>
                <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none appearance-none">
                  <option>Consulta General</option>
                  <option>Reservas</option>
                  <option>Alianzas</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Mensaje</label>
                <textarea rows={5} className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all">
                <Send className="w-6 h-6" /> ENVIAR MENSAJE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
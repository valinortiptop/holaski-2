// @ts-nocheck
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-tight">
              ESTAMOS <span className="text-blue-500">AQUÍ</span> PARA AYUDARTE
            </h1>
            <p className="text-xl text-slate-400 mb-12">
              ¿Tienes preguntas sobre un destino? ¿Necesitas un presupuesto grupal? Nuestro equipo de expertos está listo para asesorarte.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, title: 'Email', value: 'info@snowtravel.com' },
                { icon: Phone, title: 'Teléfono', value: '+34 900 123 456' },
                { icon: MapPin, title: 'Oficinas', value: 'Calle Gran Vía 12, Madrid, España' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-slate-500 font-bold uppercase text-xs tracking-widest">{item.title}</h4>
                    <p className="text-white text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-950/50 backdrop-blur-2xl p-10 md:p-12 rounded-[3rem] border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                  <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Asunto</label>
                <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mensaje</label>
                <textarea rows={5} className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-white outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3">
                <Send className="w-6 h-6" /> ENVIAR MENSAJE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
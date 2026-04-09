// @ts-nocheck
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">Hablemos</h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              ¿Tienes dudas sobre un destino o quieres organizar un viaje corporativo? Nuestro equipo de expertos está listo para ayudarte.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500"><Mail /></div>
                <div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Email</div>
                  <div className="text-white font-black text-xl">hola@holaski.com</div>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500"><Phone /></div>
                <div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">WhatsApp</div>
                  <div className="text-white font-black text-xl">+34 600 000 000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-950 p-12 rounded-[3rem] border border-white/5">
            <form className="space-y-6">
              <input type="text" placeholder="Tu Nombre" className="w-full bg-navy-900 border border-white/10 px-8 py-5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Tu Email" className="w-full bg-navy-900 border border-white/10 px-8 py-5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="¿En qué podemos ayudarte?" rows={5} className="w-full bg-navy-900 border border-white/10 px-8 py-5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                <Send size={20} /> Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
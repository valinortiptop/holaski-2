// @ts-nocheck
// src/pages/ContactPage.tsx
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('¡Mensaje enviado con éxito!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold mb-6">Hablemos de tu <span className="text-blue-500">Aventura</span></h1>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              ¿Tienes dudas o quieres un presupuesto personalizado? Nuestro equipo de expertos está listo para ayudarte a crear el viaje de tus sueños.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: Mail, label: 'Email', value: 'hola@holaski.com' },
                { icon: Phone, label: 'Teléfono', value: '+52 55 1234 5678' },
                { icon: MapPin, label: 'Oficinas', value: 'CDMX, México' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{item.label}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleContact} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nombre Completo</label>
                  <input type="text" placeholder="Tu nombre" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="tu@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mensaje</label>
                <textarea rows={6} placeholder="¿En qué podemos ayudarte?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none" required></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? 'Enviando...' : <><Send className="w-5 h-5" /> Enviar Mensaje</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// @ts-nocheck
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'send-contact', ...formData }
      });
      if (error) throw error;
      setSent(true);
      toast.success('Mensaje enviado correctamente');
    } catch (err) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Hablemos de tu <span className="text-blue-400">viaje</span></h1>
          <p className="text-white/60">Expertos en nieve listos para ayudarte a planear cada detalle.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <Mail className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-white/40 text-sm">hola@holaski.com</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-white/40 text-sm">+56 9 1234 5678</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">¡Recibido!</h3>
                <p className="text-white/50 mb-8">Te contactaremos en menos de 24 horas.</p>
                <button onClick={() => setSent(false)} className="text-blue-400 text-sm font-bold underline">Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Nombre</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Mensaje</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all min-h-[44px]"
                  />
                </div>
                <button 
                  disabled={sending}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  {sending ? 'Enviando...' : <><Send className="w-4 h-4" /> Enviar Mensaje</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

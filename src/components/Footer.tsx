// @ts-nocheck
// src/components/Footer.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const subscribe = async (e: any) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await supabase.from('newsletter_subscribers').insert({ email });
      try { await supabase.functions.invoke('api-handler', { body: { action: 'subscribe-newsletter', email } }); } catch {}
      toast.success('¡Suscripción exitosa! 🎿');
      setEmail('');
    } catch { toast.error('Error al suscribirse'); }
    setLoading(false);
  };

  const go = (path: string) => { nav(path); window.scrollTo(0, 0); };

  return (
    <footer className="bg-[#060d1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-1.5"><Mountain className="w-5 h-5" /></div>
              <span className="text-xl font-bold">Hola<span className="text-blue-400">Ski</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">Paquetes todo incluido a los mejores destinos de esquí del mundo.</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explorar</h4>
            <div className="space-y-2">
              <button onClick={() => go('/destinos')} className="block text-gray-400 hover:text-white text-sm transition">Destinos</button>
              <button onClick={() => go('/paquetes')} className="block text-gray-400 hover:text-white text-sm transition">Paquetes</button>
              <button onClick={() => go('/planear')} className="block text-gray-400 hover:text-white text-sm transition">Planear Viaje</button>
              <button onClick={() => go('/contacto')} className="block text-gray-400 hover:text-white text-sm transition">Contacto</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Destinos Top</h4>
            <div className="space-y-2">
              {['Whistler', 'Vail', 'Chamonix', 'Zermatt'].map(d => (
                <button key={d} onClick={() => go('/destinos')} className="block text-gray-400 hover:text-white text-sm transition">{d}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Recibe ofertas exclusivas de esquí.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="tu@email.com" className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 p-2.5 rounded-xl transition disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HolaSki. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
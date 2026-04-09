// @ts-nocheck
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subs').insert({ email });
      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-navy-950 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Snowflake className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">HOLASKI</span>
            </Link>
            <p className="text-slate-400">
              Transformamos el turismo de nieve en experiencias de vida inolvidables. Líderes en viajes personalizados a la montaña.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/destinos" className="text-slate-400 hover:text-blue-400 transition-colors">Destinos</Link></li>
              <li><Link to="/paquetes" className="text-slate-400 hover:text-blue-400 transition-colors">Paquetes</Link></li>
              <li><Link to="/planear" className="text-slate-400 hover:text-blue-400 transition-colors">Planear Viaje</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><Link to="/contacto" className="text-slate-400 hover:text-blue-400 transition-colors">Contacto</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">Recibe las mejores ofertas y reportes de nieve.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                required
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <Mail size={18} />
              </button>
            </form>
            {status === 'success' && <p className="text-green-500 text-xs mt-2">¡Suscrito con éxito!</p>}
            {status === 'error' && <p className="text-red-500 text-xs mt-2">Error al suscribir.</p>}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} HolaSki Travel Agency. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
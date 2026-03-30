// @ts-nocheck
// src/components/Footer.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Send, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
      if (error) throw error;
      toast.success('¡Te has suscrito correctamente!');
      setEmail('');
    } catch (err: any) {
      toast.error('Error al suscribirse. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#060D1A] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-1.5"><Mountain className="w-5 h-5" /></div>
              <span className="text-2xl font-bold">Hola<span className="text-blue-400">Ski</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Creamos experiencias inolvidables en los mejores resorts de nieve del mundo. Tu aventura premium comienza con nosotros.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <div className="space-y-4">
              {['Destinos', 'Paquetes', 'Planear Viaje', 'Contacto'].map((l) => (
                <Link key={l} to={`/${l.toLowerCase().replace(' ', '')}`} className="block text-gray-400 hover:text-white transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>hola@holaski.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>CDMX, México</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Recibe las mejores ofertas y novedades.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1.5 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HolaSki. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
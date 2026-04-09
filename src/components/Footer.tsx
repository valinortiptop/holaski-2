// @ts-nocheck
import { Link } from 'react-router-dom';
import { Mountain, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">HolaSki</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Diseñamos el viaje de tus sueños a la nieve usando inteligencia artificial y experiencia real.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/30 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/30 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/30 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Empresa</h4>
            <div className="space-y-4">
              <Link to="/about" className="block text-sm text-white/50 hover:text-white transition-colors">Nosotros</Link>
              <Link to="/contact" className="block text-sm text-white/50 hover:text-white transition-colors">Contacto</Link>
              <Link to="/careers" className="block text-sm text-white/50 hover:text-white transition-colors">Carreras</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Recursos</h4>
            <div className="space-y-4">
              <Link to="/blog" className="block text-sm text-white/50 hover:text-white transition-colors">Blog de Nieve</Link>
              <Link to="/guides" className="block text-sm text-white/50 hover:text-white transition-colors">Guías de Esquí</Link>
              <Link to="/faq" className="block text-sm text-white/50 hover:text-white transition-colors">Preguntas Frecuentes</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Newsletter</h4>
            <p className="text-sm text-white/40 mb-4">Recibe las mejores ofertas y reportes de nieve.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white w-full outline-none focus:border-blue-500/50" />
              <button className="bg-blue-600 px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-600/20">OK</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} HolaSki. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-white/20 hover:text-white">Privacidad</Link>
            <Link to="/terms" className="text-xs text-white/20 hover:text-white">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

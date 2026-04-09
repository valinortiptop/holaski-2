// @ts-nocheck
import { Link } from 'react-router-dom';
import { Mountain, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">HolaSki</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">Tu aventura en la nieve comienza aqui. Planifica y reserva los mejores destinos de esqui del mundo.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Explorar</h4>
            <div className="space-y-4">
              <Link to="/destinos" className="block text-sm text-white/60 hover:text-white transition-colors">Destinos</Link>
              <Link to="/paquetes" className="block text-sm text-white/60 hover:text-white transition-colors">Paquetes</Link>
              <Link to="/planear" className="block text-sm text-white/60 hover:text-white transition-colors">Planear Viaje</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Soporte</h4>
            <div className="space-y-4">
              <Link to="/contacto" className="block text-sm text-white/60 hover:text-white transition-colors">Contacto</Link>
              <span className="block text-sm text-white/40">Centro de ayuda</span>
              <span className="block text-sm text-white/40">Privacidad</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Redes</h4>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5 text-white/40" />
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Twitter className="w-5 h-5 text-white/40" />
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Mail className="w-5 h-5 text-white/40" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} HolaSki. Todos los derechos reservados.</p>
          <p className="text-xs text-white/20">Hecho con <span className="text-blue-500">❄️</span> para los amantes de la nieve</p>
        </div>
      </div>
    </footer>
  );
}

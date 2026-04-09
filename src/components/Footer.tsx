// @ts-nocheck
import { Link } from 'react-router-dom';
import { Mountain, Mail, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">HolaSki</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Tu aventura en la nieve comienza aquí. Planifica, reserva y disfruta los mejores destinos de esquí del mundo.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Explorar</h4>
            <div className="space-y-3">
              <Link to="/destinos" className="block text-sm text-white/60 hover:text-white transition-colors">Destinos</Link>
              <Link to="/paquetes" className="block text-sm text-white/60 hover:text-white transition-colors">Paquetes</Link>
              <Link to="/planear" className="block text-sm text-white/60 hover:text-white transition-colors">Planear Viaje</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Compañía</h4>
            <div className="space-y-3">
              <Link to="/contacto" className="block text-sm text-white/60 hover:text-white transition-colors">Contacto</Link>
              <span className="block text-sm text-white/60">Sobre Nosotros</span>
              <span className="block text-sm text-white/60">Términos</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Twitter className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Mail className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} HolaSki. Todos los derechos reservados.</p>
          <p className="text-xs text-white/20">Hecho con ❄️ para los amantes de la nieve</p>
        </div>
      </div>
    </footer>
  );
}
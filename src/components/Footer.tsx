// @ts-nocheck
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Snowflake className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold tracking-tighter text-white">HOLA<span className="text-blue-400">SKI</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tu agencia especializada en experiencias de esquí y snowboard en los mejores destinos del mundo. Expertos en viajes a medida para todos los niveles.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explora</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/destinos" className="hover:text-blue-400 transition-colors">Destinos</Link></li>
              <li><Link to="/paquetes" className="hover:text-blue-400 transition-colors">Paquetes</Link></li>
              <li><Link to="/planear-viaje" className="hover:text-blue-400 transition-colors">Planear Viaje</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-400 transition-colors">Blog de Nieve</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>hola@holaski.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+34 900 123 456</span>
              </li>
              <li className="pt-2 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <Twitter className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Suscríbete</h4>
            <p className="text-slate-400 text-sm mb-4">Recibe ofertas exclusivas y reportes de nieve.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© 2024 HolaSki. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
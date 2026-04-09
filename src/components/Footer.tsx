// @ts-nocheck
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Snowflake className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-black tracking-tighter text-white italic">SNOW<span className="text-blue-500">TRAVEL</span></span>
          </Link>
          <p className="text-slate-400 leading-relaxed mb-6">
            Especialistas en crear experiencias de nieve inolvidables en los mejores resorts del mundo. Lujo, aventura y confort.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Destinos</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/destinos" className="hover:text-white transition-colors">Alpes Franceses</Link></li>
            <li><Link to="/destinos" className="hover:text-white transition-colors">Suiza Alpina</Link></li>
            <li><Link to="/destinos" className="hover:text-white transition-colors">Colorado USA</Link></li>
            <li><Link to="/destinos" className="hover:text-white transition-colors">Hokkaido Japón</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Compañía</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/contacto" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
            <li><Link to="/paquetes" className="hover:text-white transition-colors">Paquetes</Link></li>
            <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            <li><Link to="/planear" className="hover:text-white transition-colors">Planear Viaje</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contacto</h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" /> info@snowtravel.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-500" /> +34 900 123 456
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© 2024 Snow Travel Luxury. Todos los derechos reservados.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
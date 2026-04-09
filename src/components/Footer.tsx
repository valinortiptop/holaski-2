// @ts-nocheck
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Snowflake className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">HOLA<span className="text-blue-500">SKI</span></span>
          </Link>
          <p className="text-slate-400 leading-relaxed mb-6">
            Llevamos tus sueños a las cumbres más altas del mundo. Expertos en viajes de nieve de lujo y aventura.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><Facebook size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><Mail size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Explora</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Inicio</Link></li>
            <li><Link to="/planear" className="text-slate-400 hover:text-white transition-colors">Diseñar Viaje</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Soporte</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contacto</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
          <p className="text-slate-400 mb-4 text-sm">Recibe ofertas exclusivas y guías de viaje.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Tu email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full text-white outline-none focus:border-blue-500" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">OK</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">© 2024 HolaSki. Todos los derechos reservados.</p>
        <p className="text-slate-500 text-sm">Diseñado para amantes de la nieve.</p>
      </div>
    </footer>
  );
}
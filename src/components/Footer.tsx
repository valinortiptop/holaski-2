// @ts-nocheck
import { Snowflake, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Snowflake className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">UltraSki</span>
            </Link>
            <p className="text-slate-400 max-w-sm text-lg leading-relaxed mb-8">
              Creamos experiencias de esquí personalizadas en los destinos más exclusivos del planeta. Tu aventura comienza aquí.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-8">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/destinos" className="text-slate-400 hover:text-white transition-colors">Todos los Destinos</Link></li>
              <li><Link to="/paquetes" className="text-slate-400 hover:text-white transition-colors">Ofertas y Paquetes</Link></li>
              <li><Link to="/planear-viaje" className="text-slate-400 hover:text-white transition-colors">Solicitar Presupuesto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-8">Soporte</h4>
            <ul className="space-y-4">
              <li className="text-slate-400">info@ultraski.com</li>
              <li className="text-slate-400">+34 900 123 456</li>
              <li className="text-slate-400">Centro de Ayuda</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© {currentYear} ULTRASKI. Todos los derechos reservados.</p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
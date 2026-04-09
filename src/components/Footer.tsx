// @ts-nocheck
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Snowflake className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-black tracking-tighter text-white uppercase">HolaSki</span>
          </div>
          <p className="text-slate-400 leading-relaxed">Curando las mejores experiencias de esquí y snowboard en los destinos más exclusivos del planeta.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explora</h4>
          <ul className="space-y-4">
            <li><Link to="/destinos" className="text-slate-400 hover:text-blue-400 transition-colors">Destinos</Link></li>
            <li><Link to="/paquetes" className="text-slate-400 hover:text-blue-400 transition-colors">Paquetes</Link></li>
            <li><Link to="/planear" className="text-slate-400 hover:text-blue-400 transition-colors">Diseña tu viaje</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Compañía</h4>
          <ul className="space-y-4">
            <li><Link to="/contacto" className="text-slate-400 hover:text-blue-400 transition-colors">Contacto</Link></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Sobre Nosotros</a></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Blog</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Facebook size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2024 HolaSki. Reservados todos los derechos.</p>
      </div>
    </footer>
  );
}
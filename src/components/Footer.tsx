// @ts-nocheck
import { Mountain, Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Mountain className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-black tracking-tighter">SNOW SUMMIT</span>
            </Link>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Elevando tus vacaciones de invierno a un nuevo nivel de excelencia y exclusividad.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="h-12 w-12 bg-white/5 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all border border-white/10 group">
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-8">Compañía</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><Link to="/destinos" className="hover:text-blue-400 transition-colors">Destinos</Link></li>
              <li><Link to="/paquetes" className="hover:text-blue-400 transition-colors">Paquetes</Link></li>
              <li><Link to="/planear-viaje" className="hover:text-blue-400 transition-colors">Presupuestos</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-8">Servicios</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Concierge 24/7</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Heliesquí</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Clases Privadas</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Eventos Corporativos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-8">Contacto</h4>
            <ul className="space-y-6 text-slate-400">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="font-bold">+34 900 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="font-bold">hola@snowsummit.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-bold">
            © {currentYear} SNOW SUMMIT TRAVEL SL. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
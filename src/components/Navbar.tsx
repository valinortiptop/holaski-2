// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', path: '/' },
  { label: 'Destinos', path: '/destinos' },
  { label: 'Paquetes', path: '/paquetes' },
  { label: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/5 py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-180 transition-transform duration-700">
            <Snowflake className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">HOLA<span className="text-blue-500">SKI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/planear" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all">
            Planear Viaje
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-navy-950 z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        {NAV_LINKS.map(link => (
          <Link key={link.path} to={link.path} className="text-3xl font-black uppercase text-white">{link.label}</Link>
        ))}
        <Link to="/planear" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xl mt-4">Planear Viaje</Link>
      </div>
    </nav>
  );
}
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain } from 'lucide-react';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/paquetes', label: 'Paquetes' },
  { to: '/planear', label: 'Planear Viaje' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1628]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">HolaSki</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${location.pathname === l.to ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <Link to="/planear" className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-white shadow-lg shadow-blue-600/20">
              Empezar
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#0B1628]/95 backdrop-blur-xl border-t border-white/5 h-screen">
          <div className="px-4 py-6 space-y-2">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${location.pathname === l.to ? 'bg-white/10 text-white' : 'text-white/60'}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/planear" className="block bg-blue-600 px-4 py-4 rounded-xl text-lg font-bold text-center mt-8 text-white">
              Planear Mi Viaje
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
// @ts-nocheck
// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mountain, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { name: 'Destinos', path: '/destinos' },
    { name: 'Paquetes', path: '/paquetes' },
    { name: 'Planear Viaje', path: '/planear' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1628]/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 rounded-lg p-1.5 group-hover:bg-blue-500 transition-colors">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Hola<span className="text-blue-400">Ski</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.path} to={l.path} className={`text-sm font-medium transition-colors hover:text-blue-400 ${loc.pathname === l.path ? 'text-blue-400' : 'text-gray-300'}`}>
                {l.name}
              </Link>
            ))}
            <button onClick={() => nav('/planear')} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
              <Sparkles className="w-4 h-4" /> Planear Mi Viaje
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-300 hover:text-white transition">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B1628] border-b border-white/10 p-4 space-y-4 animate-fade-down">
          {links.map(l => (
            <Link key={l.path} to={l.path} onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium text-gray-300 hover:text-blue-400">
              {l.name}
            </Link>
          ))}
          <button onClick={() => { setIsOpen(false); nav('/planear'); }} className="w-full bg-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Planear Mi Viaje
          </button>
        </div>
      )}
    </nav>
  );
}
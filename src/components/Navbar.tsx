// @ts-nocheck
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Destinos', path: '/destinos' },
    { name: 'Paquetes', path: '/paquetes' },
    { name: 'Planear Viaje', path: '/planear-viaje' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <Snowflake className="w-8 h-8 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-2xl font-bold tracking-tighter text-white">HOLA<span className="text-blue-400">SKI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === link.path ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/planear-viaje"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Presupuesto Gratis
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 w-full bg-navy-950 border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-md ${
                  location.pathname === link.path ? 'bg-navy-800 text-blue-400' : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/planear-viaje"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-xl text-base font-semibold"
              >
                Presupuesto Gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
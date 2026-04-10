// @ts-nocheck
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Destinos', path: '/destinos' },
    { name: 'Paquetes', path: '/paquetes' },
    { name: 'Planear Viaje', path: '/planear-viaje' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-black tracking-tighter">SNOW SUMMIT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "text-sm font-bold uppercase tracking-widest transition-colors",
                  isActive(link.path) ? "text-blue-500" : "text-slate-300 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/planear-viaje"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              SOLICITAR PRESUPUESTO
            </Link>
          </div>

          {/* Mobile Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-950 border-b border-white/10 p-4 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "block text-lg font-bold p-4 rounded-xl",
                isActive(link.path) ? "bg-blue-600/10 text-blue-500" : "text-slate-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
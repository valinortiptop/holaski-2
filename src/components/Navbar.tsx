// @ts-nocheck
import { useState, useEffect } from 'react';
import { Menu, X, Snowflake, Plane } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Destinos', path: '/destinos' },
    { name: 'Paquetes', path: '/paquetes' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-950/90 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform">
              <Snowflake className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">ULTRA<span className="text-blue-500">SKI</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === link.path ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/planear-viaje"
              className="bg-white text-navy-900 px-6 py-3 rounded-full font-black text-sm hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Plane className="w-4 h-4" /> PLANEAR VIAJE
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 min-w-[44px] min-h-[44px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy-950 border-t border-white/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-white uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/planear-viaje"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white p-5 rounded-2xl font-black text-xl text-center"
              >
                PLANEAR MI VIAJE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
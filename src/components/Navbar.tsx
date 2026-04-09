// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Destinos', href: '/destinos' },
    { name: 'Paquetes', href: '/paquetes' },
    { name: 'Planear Viaje', href: '/planear' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <Snowflake className="w-8 h-8 text-blue-500 transition-transform group-hover:rotate-180 duration-500" />
          <span className="text-2xl font-black tracking-tighter text-white italic">SNOW<span className="text-blue-500">TRAVEL</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === link.href ? 'text-blue-500' : 'text-slate-300 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/planear" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            RESERVAR AHORA
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-950 border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black uppercase tracking-tighter text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/planear" 
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white py-4 rounded-xl font-black text-center text-lg"
          >
            RESERVAR AHORA
          </Link>
        </div>
      )}
    </nav>
  );
}
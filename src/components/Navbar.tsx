// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy-950/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Snowflake className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">HOLA<span className="text-blue-500">SKI</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className={`font-bold hover:text-blue-400 transition-colors ${location.pathname === '/' ? 'text-blue-400' : 'text-white'}`}>INICIO</Link>
          <Link to="/planear" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
            PLANEAR VIAJE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-navy-950 z-50 pt-24 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8 text-center">
            <Link to="/" className="text-4xl font-black" onClick={() => setIsMenuOpen(false)}>INICIO</Link>
            <Link to="/planear" className="text-4xl font-black text-blue-500" onClick={() => setIsMenuOpen(false)}>PLANEAR VIAJE</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
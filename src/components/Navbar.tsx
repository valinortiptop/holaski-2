// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake, Sparkles } from 'lucide-react';

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
    { name: 'Inicio', href: '/' },
    { name: 'Destinos', href: '/resorts' },
    { name: 'Planificador IA', href: '/planner', icon: Sparkles },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Snowflake className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">SNOW<span className="text-blue-500">PRO</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1.5 ${
                  location.pathname === link.href ? 'text-blue-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                {link.name}
              </Link>
            ))}
            <button className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all">
              Mi Cuenta
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold flex items-center gap-2 ${
                  location.pathname === link.href ? 'text-blue-400' : 'text-white'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}
            <button className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold mt-2">
              Mi Cuenta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
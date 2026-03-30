// @ts-nocheck
// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (loc.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        nav('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 500);
      }
    } else {
      nav(href);
      window.scrollTo(0, 0);
    }
  };

  const links = [
    { label: 'Destinos', href: '/destinos' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Experiencia', href: '/#experiencia' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1628]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" onClick={() => { setOpen(false); window.scrollTo(0,0); }} className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-1.5"><Mountain className="w-5 h-5" /></div>
          <span className="text-xl font-bold">Hola<span className="text-blue-400">Ski</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <button key={l.label} onClick={() => go(l.href)} className="text-gray-300 hover:text-white text-sm font-medium transition">{l.label}</button>)}
        </div>
        <div className="hidden md:block">
          <button onClick={() => go('/planear')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25">
            <Sparkles className="w-4 h-4" /> Planear Viaje
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0B1628]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-1">
          {links.map(l => <button key={l.label} onClick={() => go(l.href)} className="block w-full text-left text-gray-300 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition">{l.label}</button>)}
          <button onClick={() => go('/planear')} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold mt-3"><Sparkles className="w-4 h-4" /> Planear Viaje</button>
        </div>
      )}
    </nav>
  );
}
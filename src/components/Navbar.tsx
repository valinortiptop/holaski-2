// @ts-nocheck
// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useApp } from '../App';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { user, setShowAuth } = useApp();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isHome ? 'bg-transparent' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <span className={`text-xl font-extrabold tracking-tight ${isHome ? 'text-white' : 'text-blue-700'}`}>HOLA SKI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/resorts" className={`text-sm font-medium ${isHome ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>Resorts</Link>
          <Link to="/wizard" className={`text-sm font-medium ${isHome ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>Paquetes</Link>
          <a href="#" className={`text-sm font-medium ${isHome ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>Guías</a>
          <a href="#" className={`text-sm font-medium ${isHome ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>Deals</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-lg">🇲🇽</span>
          {user ? (
            <button onClick={() => supabase.auth.signOut()} className={`text-sm ${isHome ? 'text-white/80' : 'text-gray-500'}`}>Salir</button>
          ) : (
            <button onClick={() => setShowAuth(true)} className={`p-2 rounded-full ${isHome ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>
              <User className="w-5 h-5" />
            </button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className={isHome ? 'text-white' : 'text-gray-800'} /> : <Menu className={isHome ? 'text-white' : 'text-gray-800'} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-3">
          <Link to="/resorts" onClick={() => setOpen(false)} className="block py-2 text-gray-700">Resorts</Link>
          <Link to="/wizard" onClick={() => setOpen(false)} className="block py-2 text-gray-700">Paquetes</Link>
          <a href="#" className="block py-2 text-gray-700">Guías</a>
          <a href="#" className="block py-2 text-gray-700">Deals</a>
          {!user && <button onClick={() => { setShowAuth(true); setOpen(false); }} className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">Acceder</button>}
          {user && <button onClick={() => { supabase.auth.signOut(); setOpen(false); }} className="w-full text-gray-500 py-2">Salir</button>}
        </div>
      )}
    </nav>
  );
}
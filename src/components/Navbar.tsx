// @ts-nocheck
// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';
import { useApp } from '../App';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { user, setShowAuth } = useApp();

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="text-cyan-400" />
          <span className="font-bold text-lg">HolaSki</span>
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link to="/wizard" className="text-white/70 hover:text-white">Asistente IA</Link>
          <Link to="/resorts" className="text-white/70 hover:text-white">Centros</Link>
          <Link to="/dashboard" className="text-white/70 hover:text-white">Mis Viajes</Link>
        </div>
        <div>
          {user ? (
            <button onClick={() => supabase.auth.signOut()} className="text-sm text-white/50 hover:text-white">Salir</button>
          ) : (
            <button onClick={() => setShowAuth(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Entrar</button>
          )}
        </div>
      </div>
    </nav>
  );
}
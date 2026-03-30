// @ts-nocheck
// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, Globe } from 'lucide-react';
import { useApp } from '../App';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { tr, lang, setLang, user, setShowAuth, setAuthMode, currency, setCurrency } = useApp();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const links = [
    { to: '/', label: tr('nav.home') },
    { to: '/wizard', label: tr('nav.wizard') },
    { to: '/resorts', label: tr('nav.resorts') },
    { to: '/dashboard', label: tr('nav.dash') },
  ];
  const curs = ['USD', 'CLP', 'ARS', 'MXN', 'BRL', 'EUR'];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="w-7 h-7 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">HolaSki</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${loc.pathname === l.to ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-transparent text-white/60 text-sm border border-white/10 rounded-lg px-2 py-1 focus:outline-none">
            {curs.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
          </select>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-white/60 hover:text-white text-sm flex items-center gap-1"><Globe className="w-4 h-4" />{lang === 'es' ? 'EN' : 'ES'}</button>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60">{user.full_name || user.email.split('@')[0]}</span>
              <button onClick={() => supabase.auth.signOut()} className="text-sm text-white/40 hover:text-white">{tr('nav.logout')}</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { setAuthMode('login'); setShowAuth(true); }} className="text-sm text-white/60 hover:text-white px-3 py-2">{tr('nav.login')}</button>
              <button onClick={() => { setAuthMode('signup'); setShowAuth(true); }} className="text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-medium">{tr('nav.signup')}</button>
            </div>
          )}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-2">
          {links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-white/70 hover:bg-white/5">{l.label}</Link>)}
          <div className="flex gap-4 pt-3 border-t border-white/10">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-sm text-white/60"><Globe className="w-4 h-4 inline mr-1" />{lang === 'es' ? 'EN' : 'ES'}</button>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-slate-800 text-sm text-white/60 rounded px-2 py-1 border border-white/10">
              {curs.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {!user && (
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setAuthMode('login'); setShowAuth(true); setOpen(false); }} className="flex-1 text-center text-sm py-3 rounded-lg bg-white/10 text-white">{tr('nav.login')}</button>
              <button onClick={() => { setAuthMode('signup'); setShowAuth(true); setOpen(false); }} className="flex-1 text-center text-sm py-3 rounded-lg bg-blue-500 text-white">{tr('nav.signup')}</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
// @ts-nocheck
// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useApp } from '../App';

export default function Navbar() {
  const { tr, lang, setLang, user, setShowAuth, setAuthMode, currency, setCurrency } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const location = useLocation();
  const { supabase } = require('../lib/supabase');

  const navLinks = [
    { to: '/', label: tr('nav.home') },
    { to: '/wizard', label: tr('nav.wizard') },
    { to: '/resorts', label: tr('nav.resorts') },
    { to: '/dashboard', label: tr('nav.dashboard') },
  ];

  const currencies = ['USD', 'CLP', 'ARS', 'MXN', 'BRL', 'EUR', 'COP'];

  const handleLogout = async () => {
    const { supabase: sb } = await import('../lib/supabase');
    await sb.auth.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Mountain className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">HolaSki</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setCurrOpen(!currOpen)} className="flex items-center gap-1 text-sm text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
                {currency} <ChevronDown className="w-3 h-3" />
              </button>
              {currOpen && (
                <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl py-1 min-w-[100px] shadow-xl">
                  {currencies.map(c => (
                    <button key={c} onClick={() => { setCurrency(c); setCurrOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${c === currency ? 'text-cyan-400' : 'text-white/70'}`}>{c}</button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-1 text-sm text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
              <Globe className="w-4 h-4" /> {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">{user.full_name || user.email}</span>
                <button onClick={handleLogout} className="text-sm text-white/50 hover:text-white transition-colors">{tr('nav.logout')}</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setAuthMode('login'); setShowAuth(true); }} className="text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">{tr('nav.login')}</button>
                <button onClick={() => { setAuthMode('signup'); setShowAuth(true); }} className="text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-all">{tr('nav.signup')}</button>
              </div>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium ${location.pathname === l.to ? 'bg-white/10 text-white' : 'text-white/70'}`}>{l.label}</Link>
          ))}
          <div className="flex items-center gap-4 pt-3 border-t border-white/10">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-sm text-white/70"><Globe className="w-4 h-4 inline mr-1" />{lang === 'es' ? 'EN' : 'ES'}</button>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-slate-800 text-white/70 text-sm rounded-lg px-2 py-1 border border-white/10">{currencies.map(c => <option key={c}>{c}</option>)}</select>
          </div>
          {!user && (
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setAuthMode('login'); setShowAuth(true); setMobileOpen(false); }} className="flex-1 text-center text-sm py-3 rounded-lg bg-white/10 text-white font-medium">{tr('nav.login')}</button>
              <button onClick={() => { setAuthMode('signup'); setShowAuth(true); setMobileOpen(false); }} className="flex-1 text-center text-sm py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium">{tr('nav.signup')}</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
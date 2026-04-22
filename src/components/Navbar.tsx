// @ts-nocheck
// src/components/Navbar.tsx
import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Snowflake } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Destinos', href: '/destinos' },
  { label: 'Buscar', href: '/buscar' },
  { label: 'Planear', href: '/planear' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggle = useCallback(() => setOpen(o => !o), [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
            <Snowflake className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            HOLA<span className="text-blue-400">SKI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.href
                  ? 'text-blue-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/planear"
            className="hidden md:inline-flex bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors"
          >
            Cotizar Viaje
          </Link>
          <button
            onClick={toggle}
            className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-white/5 px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.href
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/planear"
            onClick={() => setOpen(false)}
            className="block mt-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded-xl text-center transition-colors"
          >
            Cotizar Viaje
          </Link>
        </div>
      )}
    </header>
  )
}
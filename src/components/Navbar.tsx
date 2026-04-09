// @ts-nocheck
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Destinos', to: '/destinos' },
  { label: 'Paquetes', to: '/paquetes' },
  { label: 'Contacto', to: '/contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,13,26,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
        padding: scrolled ? '14px 0' : '22px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 38, height: 38, background: '#2563eb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>❄️</div>
            <span style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.04em' }}>
              HOLA<span style={{ color: '#3b82f6' }}>SKI</span>
            </span>
          </Link>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} style={{
                textDecoration: 'none', fontSize: 11, fontWeight: 800,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: loc.pathname === l.to ? '#60a5fa' : '#94a3b8',
                transition: 'color 0.2s'
              }}>{l.label}</Link>
            ))}
            <Link to="/planear" style={{
              textDecoration: 'none', background: '#2563eb', color: 'white',
              padding: '11px 24px', borderRadius: 999, fontSize: 11, fontWeight: 900,
              letterSpacing: '0.15em', textTransform: 'uppercase'
            }}>Planear Viaje</Link>
          </div>

          <button className="show-mobile" onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99, background: '#060d1a',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 28, fontWeight: 900, color: 'white', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '-0.02em', padding: '12px 0'
            }}>{l.label}</Link>
          ))}
          <Link to="/planear" style={{
            marginTop: 24, background: '#2563eb', color: 'white', textDecoration: 'none',
            padding: '18px 40px', borderRadius: 16, fontWeight: 900, textTransform: 'uppercase', fontSize: 18
          }}>Planear Viaje</Link>
        </div>
      )}
    </>
  )
}
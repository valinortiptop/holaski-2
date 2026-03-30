// @ts-nocheck
// src/components/Navbar.tsx
import { useState } from 'react';
import { Menu, X, User, Mountain } from 'lucide-react';

const navLinks = [
  { label: 'Resorts', href: '#resorts' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Guías', href: '#guias' },
  { label: 'Deals', href: '#deals' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-sm font-medium hover:text-blue-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-white" />
          </div>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xl cursor-pointer" title="Español (México)">🇲🇽</span>
            <button className="text-white hover:text-blue-300 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-holaski-navy/95 z-40 pt-20">
          <div className="flex flex-col items-center gap-6 p-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-xl font-semibold hover:text-blue-300 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl">🇲🇽</span>
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
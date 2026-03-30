// @ts-nocheck
// src/components/Footer.tsx
import { Mountain, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-7 h-7 text-blue-400" />
              <span className="text-2xl font-extrabold tracking-tight">
                Hola<span className="text-blue-400">Ski</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Tu agencia especializada en viajes de esquí desde México. Diseñamos experiencias únicas en las mejores montañas del mundo.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Destinos
            </h4>
            <ul className="space-y-3">
              {['Whistler', 'Park City', 'Vail', 'Chamonix', 'Zermatt', 'Telluride'].map((dest) => (
                <li key={dest}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Compañía
            </h4>
            <ul className="space-y-3">
              {['Sobre Nosotros', 'Blog', 'Guías de Esquí', 'Términos y Condiciones', 'Política de Privacidad', 'Aviso Legal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:hola@holaski.com" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  hola@holaski.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+525512345678" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Ciudad de México, México
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} HolaSki. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Términos
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
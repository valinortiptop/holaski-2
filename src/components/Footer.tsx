// @ts-nocheck
// src/components/Footer.tsx
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-blue-400">Tú eliges la montaña.</span>
          </h2>
          <p className="text-xl text-white/80">Nosotros nos ocupamos del resto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/10 pt-10">
          <div>
            <div className="mb-4">
              <span className="text-2xl font-extrabold tracking-tight">HOLA SKI</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">Tu agencia especializada en viajes de ski. Llevamos a mexicanos a las mejores pistas del mundo desde 2010.</p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Destinos</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Alpes Franceses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Colorado, USA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suiza</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Canadá</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Andorra</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Austria</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog de Ski</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabaja con Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Programa de Afiliados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> hola@holaski.mx</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> +52 55 5123 4567</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-blue-400 mt-0.5" /> Paseo de la Reforma 250, Col. Juárez, CDMX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} HolaSki. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
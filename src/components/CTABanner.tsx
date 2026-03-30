// @ts-nocheck
// src/components/CTABanner.tsx
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 via-[#0B1628]/85 to-[#0B1628]/70" />

      {/* Decorative accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
          Tú eliges la montaña.
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 md:mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Nosotros nos ocupamos del resto.
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
          Desde el vuelo hasta las clases de esquí, pasando por el hotel y el forfait. 
          Tú solo preocúpate por disfrutar la nieve.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#search"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Planear Mi Viaje
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/20 hover:bg-white/[0.15] hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            Hablar con Experto
          </a>
        </div>
      </div>
    </section>
  );
}
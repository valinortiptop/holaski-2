// @ts-nocheck
// src/components/ExperienceSection.tsx
import { DollarSign, Headphones, CreditCard, Award, Mountain } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Mejor Precio Garantizado',
    description: 'Comparamos entre cientos de proveedores para ofrecerte el mejor precio. Si lo encuentras más barato, lo igualamos.',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible las 24 horas del día, los 7 días de la semana, antes, durante y después de tu viaje.',
  },
  {
    icon: CreditCard,
    title: 'Pago Flexible',
    description: 'Paga en mensualidades sin intereses, acepta múltiples monedas y métodos de pago para tu comodidad.',
  },
  {
    icon: Award,
    title: 'Expertos en Esquí',
    description: 'Nuestro equipo ha esquiado en cada resort que recomendamos. Conocemos cada pista y cada rincón.',
  },
];

export default function ExperienceSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image - dark mountains */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0B1628]/90" />

      {/* Mountain silhouette SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto opacity-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,120 L120,80 L240,130 L360,60 L480,100 L600,40 L720,90 L840,30 L960,70 L1080,50 L1200,100 L1320,60 L1440,80 L1440,200 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="bg-blue-500/20 p-2.5 rounded-xl">
              <Mountain className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            La Experiencia
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Hola<span className="text-blue-400">Ski</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-7 hover:bg-white/[0.1] hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base md:text-lg mb-2.5 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
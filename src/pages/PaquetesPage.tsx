// @ts-nocheck
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    name: 'Básico',
    icon: Zap,
    price: 'Desde $1,299',
    color: 'blue',
    features: [
      'Alojamiento en Hoteles 3*',
      'Pase de montaña 6 días',
      'Seguro de viaje estándar',
      'Guía de resort digital',
      'Soporte vía WhatsApp'
    ]
  },
  {
    name: 'Premium',
    icon: Star,
    price: 'Desde $2,499',
    color: 'blue',
    featured: true,
    features: [
      'Hoteles 4* Ski-in / Ski-out',
      'Pase de montaña VIP',
      'Seguro Premium Multideporte',
      'Transporte privado aeropuerto',
      'Concierge personal 24/7',
      'Reserva de restaurantes'
    ]
  },
  {
    name: 'Lujo',
    icon: Crown,
    price: 'Desde $5,999',
    color: 'blue',
    features: [
      'Chalet Privado o Hotel 5* L',
      'Heliesquí (1 jornada)',
      'Chef privado y Open Bar',
      'Equipo Pro de última generación',
      'Vuelo en jet privado (opcional)',
      'Acceso exclusivo a eventos'
    ]
  }
];

export default function PaquetesPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Planes a <span className="text-blue-500">Medida</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Elige el nivel de servicio que mejor se adapte a tu estilo de vida. Todos nuestros paquetes son 100% personalizables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div 
              key={tier.name}
              className={`relative bg-navy-950/50 backdrop-blur-xl border-2 rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-[1.02] ${
                tier.featured ? 'border-blue-500 shadow-2xl shadow-blue-500/10' : 'border-white/5'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <tier.icon className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-3xl font-black text-white mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-blue-400">{tier.price}</div>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-slate-300">
                    <div className="mt-1 bg-blue-500/10 p-1 rounded-full">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/planear"
                className={`w-full block text-center py-4 rounded-2xl font-bold transition-all ${
                  tier.featured 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-navy-800 hover:bg-navy-700 text-white'
                }`}
              >
                Solicitar este plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
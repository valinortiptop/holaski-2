// @ts-nocheck
import { Check, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaquetesPage() {
  const tiers = [
    {
      name: 'Essential',
      price: 'Desde 1.490€',
      desc: 'La experiencia alpina fundamental con el sello de calidad Snow Travel.',
      features: [
        '7 noches en Hotel 3* superior',
        'Pase de esquí para toda la semana',
        'Transporte desde aeropuerto',
        'Seguro de viaje básico',
        'App de itinerario personalizada'
      ],
      color: 'slate-400'
    },
    {
      name: 'Premium',
      price: 'Desde 2.950€',
      desc: 'Nuestra opción más popular para quienes buscan confort y exclusividad.',
      features: [
        '7 noches en Hotel 4* Luxe o Chalet',
        'Pase VIP sin colas',
        'Alquiler de equipo gama alta',
        'Clases particulares (3 días)',
        'Reserva prioritaria en restaurantes',
        'Seguro premium multideporte'
      ],
      color: 'blue-500',
      popular: true
    },
    {
      name: 'Black Diamond',
      price: 'Desde 5.800€',
      desc: 'El máximo lujo. Todo incluido, todo personalizado, sin límites.',
      features: [
        'Chalet privado con chef y servicio',
        'Vuelos en clase preferente / Heliesquí',
        'Concierge personal 24/7 en resort',
        'Equipo personalizado a estrenar',
        'Experiencias gastronómicas Michelin',
        'Servicio de fotografía privado'
      ],
      color: 'white'
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">PLANES A <span className="text-blue-500">MEDIDA</span></h1>
        <p className="text-xl text-slate-400 mb-20 max-w-2xl mx-auto">
          Elige el nivel de servicio que mejor se adapte a tus expectativas. Todos nuestros paquetes son personalizables.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative bg-navy-950/50 backdrop-blur-xl border-2 rounded-[3rem] p-10 flex flex-col text-left transition-all hover:scale-[1.02] ${
                tier.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/20' : 'border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest">
                  MÁS POPULAR
                </div>
              )}
              
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{tier.name}</h3>
              <div className="text-3xl font-black text-blue-500 mb-6">{tier.price}</div>
              <p className="text-slate-400 mb-10 min-h-[60px]">{tier.desc}</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/planear" 
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all text-center ${
                  tier.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                SOLICITAR PLAN
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
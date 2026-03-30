// @ts-nocheck
// src/pages/PackagesPage.tsx
import { PACKAGES } from '../data/resorts';
import { Star, Clock, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PackagesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Paquetes <span className="text-blue-400">Todo Incluido</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Viajes diseñados para que tu única preocupación sea disfrutar de la nieve.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((p) => (
            <div key={p.id} className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-blue-500/30 transition-all shadow-xl">
              <div className="relative h-56">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-black uppercase tracking-tighter px-3 py-1 rounded-full shadow-lg">
                  Más Vendido
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{p.title}</h3>
                    <p className="text-blue-400 text-sm font-medium">{p.destination}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">{p.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {p.duration}</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Todo incluido</div>
                </div>

                <ul className="space-y-2 mb-8 flex-1">
                  {['Hospedaje Premium', 'Lift Pass Incluido', 'Traslados VIP'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-2xl font-black">{p.price}</span>
                  <button 
                    onClick={() => navigate('/planear')}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
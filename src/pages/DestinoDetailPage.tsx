// @ts-nocheck
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Calendar, Snowflake, Thermometer, Mountain, Users } from 'lucide-react';
import { RESORTS } from '../data/resorts';

export default function DestinoDetailPage() {
  const { slug } = useParams();
  const resort = RESORTS.find(r => r.slug === slug);

  if (!resort) return <div className="min-h-screen pt-32 text-center">Destino no encontrado</div>;

  return (
    <div className="bg-navy-900 min-h-screen">
      <div className="relative h-[70vh] w-full">
        <img src={resort.image_url} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        <div className="absolute top-32 left-6 md:left-20">
          <Link to="/destinos" className="flex items-center gap-2 text-white font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={20} /> Volver
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{resort.flag}</span>
                <span className="px-4 py-1 bg-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">Destino Premium</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">{resort.name}</h1>
              <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest">
                <MapPin className="text-blue-500" /> {resort.region}, {resort.country}
              </div>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              {resort.long_description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Mountain, label: 'Altitud Max', val: `${resort.altitude_top}m` },
                { icon: Snowflake, label: 'Pistas', val: `${resort.slopes_km}km` },
                { icon: Calendar, label: 'Temporada', val: resort.season },
                { icon: Thermometer, label: 'Nieve', val: `${resort.snow_reliability}% ok` },
              ].map((item, i) => (
                <div key={i} className="bg-navy-950 p-6 rounded-[2rem] border border-white/5">
                  <item.icon className="text-blue-500 mb-4" />
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-white font-black text-lg">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[3rem] p-10 sticky top-32 text-navy-900">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Reserva tu Experiencia</h3>
              <p className="text-slate-600 mb-8 font-medium">Desde hoteles 5* hasta clases privadas con campeones olímpicos.</p>
              
              <Link 
                to="/planear" 
                className="w-full bg-blue-600 hover:bg-navy-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-center block"
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
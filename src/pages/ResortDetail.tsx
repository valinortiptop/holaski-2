// @ts-nocheck
import { useParams, Link } from 'react-router-dom';
import { resorts } from '../data/resorts';
import { ChevronLeft, Mountain, Wind, Thermometer, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function ResortDetail() {
  const { slug } = useParams();
  const resort = resorts.find(r => r.slug === slug);

  if (!resort) return <div className="pt-32 text-center">Estación no encontrada.</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[60vh] w-full">
        <img src={resort.image} className="w-full h-full object-cover" alt={resort.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-24 left-4 lg:left-8">
          <Link to="/resorts" className="flex items-center text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver
          </Link>
        </div>
        <div className="absolute bottom-12 left-0 right-0 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center text-blue-400 font-semibold mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              {resort.region}, {resort.country}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{resort.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre {resort.name}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{resort.longDescription}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-2xl text-center">
                <Mountain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500 mb-1">Cota Máxima</div>
                <div className="text-xl font-bold text-slate-900">{resort.altitude.peak}m</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl text-center">
                <Wind className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500 mb-1">Pistas</div>
                <div className="text-xl font-bold text-slate-900">{resort.trails.total}</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl text-center">
                <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500 mb-1">Nieve (1-5)</div>
                <div className="text-xl font-bold text-slate-900">{resort.snowReliability}/5</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-500 mb-1">Temporada</div>
                <div className="text-sm font-bold text-slate-900 leading-tight">{resort.season.start} - {resort.season.end}</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Lo más destacado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resort.highlights.map(h => (
                <div key={h} className="flex items-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
              <div className="text-sm text-slate-500 mb-2">Desde</div>
              <div className="text-3xl font-bold text-slate-900 mb-6">
                ${resort.priceRange.min} <span className="text-lg font-normal text-slate-500">/ día</span>
              </div>
              
              <div className="space-y-4 mb-8">
                {resort.features.map(f => (
                  <div key={f} className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {f}
                  </div>
                ))}
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors mb-4">
                Solicitar Presupuesto
              </button>
              <p className="text-center text-xs text-slate-400">
                Cancelación gratuita hasta 30 días antes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
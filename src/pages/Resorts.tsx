import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resorts } from '../data/resorts';
import { Search, MapPin, Wind, Mountain } from 'lucide-react';

export default function Resorts() {
  const [filter, setFilter] = useState('Todas');
  const regions = ['Todas', 'Europa', 'Norteamérica', 'Sudamérica', 'Asia'];
  
  const filteredResorts = filter === 'Todas' 
    ? resorts 
    : resorts.filter(r => r.continent === filter);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explora Estaciones de Esquí</h1>
          <p className="text-xl text-slate-600">Encuentra tu próximo destino perfecto para deslizarte.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === region 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResorts.map(resort => (
            <Link 
              to={`/resorts/${resort.slug}`} 
              key={resort.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={resort.image} 
                  alt={resort.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                  {resort.rating} ★
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-blue-600 text-sm font-semibold mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {resort.country}, {resort.continent}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {resort.name}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                  {resort.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    <span className="flex items-center"><Mountain className="w-3 h-3 mr-1" /> {resort.altitude.peak}m</span>
                    <span className="flex items-center"><Wind className="w-3 h-3 mr-1" /> {resort.trails.total} pistas</span>
                  </div>
                  <span className="text-blue-600 font-bold text-sm">Ver más</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
// @ts-nocheck
// src/components/DestinationsByCountry.tsx
import { ChevronRight } from 'lucide-react';

const countries = [
  { name: 'Estados Unidos', resorts: 25, flag: '🇺🇸' },
  { name: 'Canada', resorts: 7, flag: '🇨🇦' },
  { name: 'Argentina', resorts: 5, flag: '🇦🇷' },
  { name: 'Francia', resorts: 14, flag: '🇫🇷' },
  { name: 'Italia', resorts: 11, flag: '🇮🇹' },
  { name: 'Suiza', resorts: 25, flag: '🇨🇭' },
];

export default function DestinationsByCountry() {
  return (
    <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 underline underline-offset-8 decoration-2">
        Destinos por país
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <button
            key={country.name}
            className="flex items-center gap-4 px-5 py-4 border-2 border-gray-200 rounded-2xl hover:border-holaski-blue hover:shadow-md transition-all group bg-white"
          >
            <span className="text-3xl md:text-4xl">{country.flag}</span>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900 text-sm md:text-base">{country.name}</p>
              <p className="text-xs text-gray-500">{country.resorts} resorts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-holaski-blue transition-colors" />
          </button>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="text-holaski-blue font-semibold text-sm hover:underline transition-all">
          Todos los países
        </button>
      </div>
    </section>
  );
}
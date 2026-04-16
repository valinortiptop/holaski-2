// @ts-nocheck
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const countries = [
  { name: 'Estados Unidos', resorts: 25, flag: '🇺🇸', id: 'usa' },
  { name: 'Canadá', resorts: 7, flag: '🇨🇦', id: 'canada' },
  { name: 'Chile', resorts: 4, flag: '🇨🇱', id: 'chile' },
  { name: 'Argentina', resorts: 5, flag: '🇦🇷', id: 'argentina' },
  { name: 'Francia', resorts: 14, flag: '🇫🇷', id: 'francia' },
  { name: 'Italia', resorts: 11, flag: '🇮🇹', id: 'italia' },
  { name: 'Suiza', resorts: 25, flag: '🇨🇭', id: 'suiza' },
  { name: 'Andorra', resorts: 3, flag: '🇦🇩', id: 'andorra' },
  { name: 'Japón', resorts: 12, flag: '🇯🇵', id: 'japon' },
];

export default function DestinationsByCountry() {
  const navigate = useNavigate();

  const handleCountryClick = (countryName: string) => {
    // Navigate to search/explore page with country filter
    const params = new URLSearchParams();
    params.set('country', countryName);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 underline underline-offset-8 decoration-holaski-blue decoration-2">
        Destinos por país
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleCountryClick(country.name)}
            className="flex items-center gap-4 px-5 py-4 border-2 border-gray-100 rounded-2xl hover:border-holaski-blue hover:shadow-md transition-all group bg-white active:scale-95"
          >
            <span className="text-3xl md:text-4xl" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900 text-sm md:text-base">{country.name}</p>
              <p className="text-xs text-gray-500">{country.resorts} resorts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-holaski-blue group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={() => navigate('/explore')}
          className="inline-flex items-center justify-center px-8 py-3 border-2 border-holaski-blue text-holaski-blue font-bold rounded-full hover:bg-holaski-blue hover:text-white transition-all duration-300 active:scale-95"
        >
          Ver todos los países
        </button>
      </div>
    </section>
  );
}
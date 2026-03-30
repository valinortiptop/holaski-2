// @ts-nocheck
// src/components/PopularDestinations.tsx
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    name: 'Whistler',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&h=400&fit=crop&crop=center',
  },
  {
    name: 'Park City',
    image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=400&fit=crop&crop=center',
  },
  {
    name: 'Vail',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop&crop=center',
  },
  {
    name: 'Telluride',
    image: 'https://images.unsplash.com/photo-1486728297118-82a07bc48a28?w=400&h=400&fit=crop&crop=center',
  },
  {
    name: 'Chamonix',
    image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=400&h=400&fit=crop&crop=center',
  },
  {
    name: 'Zermatt',
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=400&h=400&fit=crop&crop=center',
  },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    const newPos = direction === 'left' 
      ? scrollPos - scrollAmount 
      : scrollPos + scrollAmount;
    scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    setScrollPos(newPos);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 underline underline-offset-8 decoration-2">
        Destinos populares
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => setScrollPos((e.target as HTMLDivElement).scrollLeft)}
        >
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="flex-shrink-0 snap-center cursor-pointer group"
            >
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-105 relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl text-shadow">
                    {dest.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
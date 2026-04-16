// @ts-nocheck
// src/components/search/HotelResultCard.tsx
import { memo } from 'react';
import { Star, MapPin, Snowflake } from 'lucide-react';
import { HotelbedsHotel, formatMXN, starsFromCategory } from '../../lib/hotelbeds';

interface Props {
  hotel: HotelbedsHotel;
  nights: number;
}

function HotelResultCardBase({ hotel, nights }: Props) {
  const stars = starsFromCategory(hotel.categoryName);
  const totalMin = hotel.minRate * nights;

  return (
    <article className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/30 rounded-2xl p-5 transition-all group">
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-white text-lg leading-tight truncate group-hover:text-blue-300 transition-colors">
            {hotel.name}
          </h3>
          {hotel.zoneName && (
            <p className="text-xs text-white/50 flex items-center gap-1 mt-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{hotel.zoneName}{hotel.destinationName ? `, ${hotel.destinationName}` : ''}</span>
            </p>
          )}
        </div>
        {stars > 0 && (
          <div className="flex shrink-0">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        )}
      </div>

      {hotel.categoryName && (
        <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-full mb-4">
          <Snowflake className="w-3 h-3" /> {hotel.categoryName}
        </div>
      )}

      <div className="flex items-end justify-between pt-4 border-t border-white/5">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Desde</p>
          <p className="text-2xl font-black text-white truncate">{formatMXN(hotel.minRate)}</p>
          <p className="text-[11px] text-white/40">por noche</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-white/40">{nights} noches</p>
          <p className="text-sm font-bold text-blue-300">{formatMXN(totalMin)}</p>
        </div>
      </div>
    </article>
  );
}

export const HotelResultCard = memo(HotelResultCardBase);
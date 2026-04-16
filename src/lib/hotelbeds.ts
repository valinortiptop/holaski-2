// @ts-nocheck
// src/lib/hotelbeds.ts
// Ski destination → Hotelbeds destinationCode mapping.
// Destination codes are 3 letters. Confirm each against Hotelbeds
// destinations API before going live; sandbox tolerates approximates.

export interface SkiDestination {
  slug: string;
  name: string;
  country: string;
  code: string;      // Hotelbeds destinationCode
  flag: string;
  region: string;
}

export const SKI_DESTINATIONS: SkiDestination[] = [
  { slug: 'bariloche',    name: 'Bariloche / Cerro Catedral', country: 'Argentina',   code: 'BRC', flag: '🇦🇷', region: 'Sudamérica' },
  { slug: 'las-lenas',    name: 'Las Leñas',                   country: 'Argentina',   code: 'MDZ', flag: '🇦🇷', region: 'Sudamérica' },
  { slug: 'valle-nevado', name: 'Valle Nevado',                country: 'Chile',        code: 'SCL', flag: '🇨🇱', region: 'Sudamérica' },
  { slug: 'portillo',     name: 'Portillo',                    country: 'Chile',        code: 'SCL', flag: '🇨🇱', region: 'Sudamérica' },
  { slug: 'aspen',        name: 'Aspen',                       country: 'USA',          code: 'ASE', flag: '🇺🇸', region: 'Norteamérica' },
  { slug: 'whistler',     name: 'Whistler',                    country: 'Canadá',       code: 'YVR', flag: '🇨🇦', region: 'Norteamérica' },
  { slug: 'chamonix',     name: 'Chamonix',                    country: 'Francia',      code: 'CMX', flag: '🇫🇷', region: 'Europa' },
  { slug: 'zermatt',      name: 'Zermatt',                     country: 'Suiza',        code: 'ZRH', flag: '🇨🇭', region: 'Europa' },
  { slug: 'niseko',       name: 'Niseko',                      country: 'Japón',        code: 'CTS', flag: '🇯🇵', region: 'Asia' },
];

export interface HotelbedsHotel {
  code: number;
  name: string;
  categoryName?: string;
  destinationName?: string;
  zoneName?: string;
  latitude?: number;
  longitude?: number;
  currency: string;
  minRate: number;
  maxRate: number;
  rooms?: unknown[];
}

export interface HotelSearchResponse {
  hotels: HotelbedsHotel[];
  total: number;
  checkIn: string;
  checkOut: string;
  error?: string;
}

export interface HotelSearchParams {
  destinationCode: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  adults: number;
  children: number;
  rooms: number;
}

export const formatMXN = (n: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n);

export const starsFromCategory = (cat?: string): number => {
  if (!cat) return 0;
  const m = cat.match(/(\d)/);
  return m ? Number(m[1]) : 0;
};
// @ts-nocheck
// src/data/destinations.ts
export interface Destination {
  value: string;
  label: string;
}

export interface CountryGroup {
  country: string;
  flag: string;
  destinations: Destination[];
}

export const destinationsByCountry: CountryGroup[] = [
  {
    country: 'Argentina',
    flag: '🇦🇷',
    destinations: [
      { value: 'cerro-catedral', label: 'Cerro Catedral, Bariloche' },
      { value: 'las-lenas', label: 'Las Leñas, Mendoza' },
      { value: 'chapelco', label: 'Chapelco, San Martín de los Andes' },
      { value: 'cerro-castor', label: 'Cerro Castor, Ushuaia' },
      { value: 'caviahue', label: 'Caviahue, Neuquén' },
    ],
  },
  {
    country: 'Chile',
    flag: '🇨🇱',
    destinations: [
      { value: 'valle-nevado', label: 'Valle Nevado, Santiago' },
      { value: 'portillo', label: 'Portillo' },
      { value: 'la-parva', label: 'La Parva' },
      { value: 'el-colorado', label: 'El Colorado' },
      { value: 'nevados-chillan', label: 'Nevados de Chillán' },
      { value: 'corralco', label: 'Corralco, Araucanía' },
    ],
  },
  {
    country: 'Estados Unidos',
    flag: '🇺🇸',
    destinations: [
      { value: 'aspen', label: 'Aspen Snowmass, Colorado' },
      { value: 'vail', label: 'Vail, Colorado' },
      { value: 'breckenridge', label: 'Breckenridge, Colorado' },
      { value: 'park-city', label: 'Park City, Utah' },
      { value: 'deer-valley', label: 'Deer Valley, Utah' },
      { value: 'jackson-hole', label: 'Jackson Hole, Wyoming' },
      { value: 'mammoth', label: 'Mammoth Mountain, California' },
      { value: 'lake-tahoe', label: 'Lake Tahoe, California' },
    ],
  },
  {
    country: 'Canadá',
    flag: '🇨🇦',
    destinations: [
      { value: 'whistler', label: 'Whistler Blackcomb, BC' },
      { value: 'banff', label: 'Banff, Alberta' },
      { value: 'lake-louise', label: 'Lake Louise, Alberta' },
      { value: 'revelstoke', label: 'Revelstoke, BC' },
      { value: 'mont-tremblant', label: 'Mont-Tremblant, Quebec' },
    ],
  },
  {
    country: 'Francia',
    flag: '🇫🇷',
    destinations: [
      { value: 'chamonix', label: 'Chamonix Mont-Blanc' },
      { value: 'val-disere', label: "Val d'Isère" },
      { value: 'courchevel', label: 'Courchevel' },
      { value: 'meribel', label: 'Méribel' },
      { value: 'tignes', label: 'Tignes' },
      { value: 'les-trois-vallees', label: 'Les Trois Vallées' },
    ],
  },
  {
    country: 'Suiza',
    flag: '🇨🇭',
    destinations: [
      { value: 'zermatt', label: 'Zermatt' },
      { value: 'verbier', label: 'Verbier' },
      { value: 'st-moritz', label: 'St. Moritz' },
      { value: 'davos', label: 'Davos-Klosters' },
      { value: 'gstaad', label: 'Gstaad' },
    ],
  },
  {
    country: 'Italia',
    flag: '🇮🇹',
    destinations: [
      { value: 'cortina', label: "Cortina d'Ampezzo, Dolomitas" },
      { value: 'val-gardena', label: 'Val Gardena, Dolomitas' },
      { value: 'livigno', label: 'Livigno' },
      { value: 'cervinia', label: 'Cervinia' },
      { value: 'madonna-campiglio', label: 'Madonna di Campiglio' },
    ],
  },
  {
    country: 'Austria',
    flag: '🇦🇹',
    destinations: [
      { value: 'st-anton', label: 'St. Anton am Arlberg' },
      { value: 'kitzbuhel', label: 'Kitzbühel' },
      { value: 'solden', label: 'Sölden' },
      { value: 'ischgl', label: 'Ischgl' },
      { value: 'mayrhofen', label: 'Mayrhofen' },
    ],
  },
  {
    country: 'Japón',
    flag: '🇯🇵',
    destinations: [
      { value: 'niseko', label: 'Niseko, Hokkaido' },
      { value: 'hakuba', label: 'Hakuba Valley, Nagano' },
      { value: 'nozawa-onsen', label: 'Nozawa Onsen' },
      { value: 'rusutsu', label: 'Rusutsu, Hokkaido' },
      { value: 'furano', label: 'Furano, Hokkaido' },
    ],
  },
];

export function getAllDestinations(): Destination[] {
  return destinationsByCountry.flatMap((g) => g.destinations);
}

export function findDestinationLabel(value: string): string {
  const all = getAllDestinations();
  return all.find((d) => d.value === value)?.label ?? '';
}
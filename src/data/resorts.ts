// @ts-nocheck
export interface Resort {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  flag: string;
  altitude_top: number;
  altitude_base: number;
  slopes_km: number;
  runs_total: number;
  lifts_total: number;
  difficulty: { green: number; blue: number; red: number; black: number };
  description: string;
  long_description: string;
  price_level: number;
  category: 'luxury' | 'adventure' | 'family' | 'expert';
  image_url: string;
  gallery: string[];
  highlights: string[];
  best_for: string[];
  snow_reliability: number;
  season: string;
}

export const RESORTS: Resort[] = [
  {
    id: '1',
    slug: 'courchevel',
    name: 'Courchevel',
    region: 'Les 3 Vallées',
    country: 'Francia',
    flag: '🇫🇷',
    altitude_top: 2738,
    altitude_base: 1300,
    slopes_km: 600,
    runs_total: 150,
    lifts_total: 180,
    difficulty: { green: 27, blue: 40, red: 36, black: 10 },
    description: 'El epítome del lujo alpino en el dominio esquiable más grande del mundo.',
    long_description: 'Courchevel es sinónimo de lujo en los Alpes franceses. Situado en el corazón de Les 3 Vallées, el dominio esquiable más grande del mundo con más de 600 km de pistas, ofrece una experiencia sin igual.',
    price_level: 3,
    category: 'luxury',
    image_url: 'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=800'
    ],
    highlights: ['Dominio más grande del mundo', 'Gastronomía Michelin'],
    best_for: ['Lujo', 'Familias VIP'],
    snow_reliability: 85,
    season: 'Diciembre - Abril'
  },
  {
    id: '2',
    slug: 'zermatt',
    name: 'Zermatt',
    region: 'Valais',
    country: 'Suiza',
    flag: '🇨🇭',
    altitude_top: 3883,
    altitude_base: 1620,
    slopes_km: 360,
    runs_total: 145,
    lifts_total: 52,
    difficulty: { green: 15, blue: 35, red: 35, black: 15 },
    description: 'Esquí icónico a la sombra del Matterhorn con nieve garantizada todo el año.',
    long_description: 'Zermatt es la joya de la corona del esquí suizo. Dominado por la majestuosa silueta del Matterhorn.',
    price_level: 3,
    category: 'luxury',
    image_url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800'
    ],
    highlights: ['Esquí todo el año', 'Vista al Matterhorn'],
    best_for: ['Todo el año', 'Parejas'],
    snow_reliability: 95,
    season: 'Todo el año'
  }
];
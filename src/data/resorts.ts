// @ts-nocheck
import { Resort } from '../types';

export const RESORTS: Resort[] = [
  {
    id: '1',
    slug: 'courchevel-francia',
    name: 'Courchevel',
    region: 'Les Trois Vallées',
    country: 'Francia',
    altitude_top: 2738,
    altitude_base: 1300,
    runs_total: 150,
    lifts_total: 60,
    difficulty_json: { green: 27, blue: 44, red: 38, black: 11 },
    description: 'El epítome del lujo y el esquí de clase mundial en el dominio esquiable más grande del mundo.',
    price_level: 3,
    image_url: 'https://images.unsplash.com/photo-1549166417-431839178221?q=80&w=2000&auto=format&fit=crop',
    gallery_urls: []
  },
  {
    id: '2',
    slug: 'zermatt-suiza',
    name: 'Zermatt',
    region: 'Valais',
    country: 'Suiza',
    altitude_top: 3883,
    altitude_base: 1620,
    runs_total: 360,
    lifts_total: 52,
    difficulty_json: { green: 20, blue: 40, red: 30, black: 10 },
    description: 'Esquí icónico a la sombra del Matterhorn. Glaciares, elegancia y nieve asegurada todo el año.',
    price_level: 3,
    image_url: 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?q=80&w=2000&auto=format&fit=crop',
    gallery_urls: []
  },
  {
    id: '3',
    slug: 'vail-eeuu',
    name: 'Vail',
    region: 'Colorado',
    country: 'EE.UU.',
    altitude_top: 3527,
    altitude_base: 2475,
    runs_total: 195,
    lifts_total: 31,
    difficulty_json: { green: 18, blue: 29, red: 0, black: 53 },
    description: 'La montaña más legendaria de Colorado. Famosa por sus "Back Bowls" y su pueblo estilo europeo.',
    price_level: 3,
    image_url: 'https://images.unsplash.com/photo-1551632432-c735e82404ed?q=80&w=2000&auto=format&fit=crop',
    gallery_urls: []
  },
  {
    id: '4',
    slug: 'st-anton-austria',
    name: 'St. Anton am Arlberg',
    region: 'Arlberg',
    country: 'Austria',
    altitude_top: 2811,
    altitude_base: 1304,
    runs_total: 305,
    lifts_total: 88,
    difficulty_json: { green: 40, blue: 40, red: 20, black: 0 },
    description: 'La cuna del esquí alpino. Famoso por su desafiante fuera de pista y su legendario après-ski.',
    price_level: 2,
    image_url: 'https://images.unsplash.com/photo-1547014762-3a94fb4df70a?q=80&w=2000&auto=format&fit=crop',
    gallery_urls: []
  }
];
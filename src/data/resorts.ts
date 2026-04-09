// @ts-nocheck
import { Resort } from '../types/database';

export const RESORTS: Resort[] = [
  {
    id: '1',
    name: 'Courchevel',
    slug: 'courchevel',
    country: 'Francia',
    region: 'Les Trois Vallées',
    description: 'El epítome del lujo en los Alpes franceses, parte del dominio esquiable más grande del mundo.',
    stats: {
      altitude: '1300m - 2738m',
      slopes: '600km',
      lifts: '180',
      difficulty: { easy: 45, intermediate: 35, advanced: 20 }
    },
    image_url: 'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80',
    category: 'lux'
  },
  {
    id: '2',
    name: 'Zermatt',
    slug: 'zermatt',
    country: 'Suiza',
    region: 'Valais',
    description: 'A la sombra del Matterhorn, ofrece el esquí de verano más alto de Europa y un pueblo libre de coches.',
    stats: {
      altitude: '1620m - 3883m',
      slopes: '360km',
      lifts: '52',
      difficulty: { easy: 20, intermediate: 60, advanced: 20 }
    },
    image_url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80',
    category: 'lux'
  },
  {
    id: '3',
    name: 'Val d\'Isere',
    slug: 'val-disere',
    country: 'Francia',
    region: 'Espace Killy',
    description: 'Famoso por su terreno fuera de pista de clase mundial y su vibrante ambiente de après-ski.',
    stats: {
      altitude: '1850m - 3456m',
      slopes: '300km',
      lifts: '90',
      difficulty: { easy: 15, intermediate: 45, advanced: 40 }
    },
    image_url: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80',
    category: 'pro'
  },
  {
    id: '4',
    name: 'St. Moritz',
    slug: 'st-moritz',
    country: 'Suiza',
    region: 'Engadina',
    description: 'Donde nació el turismo de invierno. Elegancia clásica, sol radiante y pistas impecables.',
    stats: {
      altitude: '1850m - 3303m',
      slopes: '350km',
      lifts: '56',
      difficulty: { easy: 20, intermediate: 70, advanced: 10 }
    },
    image_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80',
    category: 'lux'
  },
  {
    id: '5',
    name: 'Aspen Snowmass',
    slug: 'aspen',
    country: 'USA',
    region: 'Colorado',
    description: 'Cuatro montañas, una experiencia inigualable. Cultura, lujo y nieve "champagne powder".',
    stats: {
      altitude: '2422m - 3813m',
      slopes: '480km',
      lifts: '42',
      difficulty: { easy: 10, intermediate: 45, advanced: 45 }
    },
    image_url: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80',
    category: 'lux'
  },
  {
    id: '6',
    name: 'Niseko',
    slug: 'niseko',
    country: 'Japón',
    region: 'Hokkaido',
    description: 'Famoso por tener la nieve polvo más ligera del planeta y sus relajantes onsens tras el esquí.',
    stats: {
      altitude: '200m - 1200m',
      slopes: '50km',
      lifts: '30',
      difficulty: { easy: 30, intermediate: 40, advanced: 30 }
    },
    image_url: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&q=80',
    category: 'pro'
  }
];
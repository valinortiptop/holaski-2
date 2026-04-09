// src/data/resorts.ts
export interface Resort {
  id: string;
  name: string;
  country: string;
  description: string;
  image_url: string;
  runs?: number;
  lifts?: number;
  elevation?: string;
  rating?: number;
  price_from?: string;
  difficulty?: string;
}

export const FALLBACK_RESORTS: Resort[] = [
  {
    id: 'whistler-blackcomb',
    name: 'Whistler Blackcomb',
    country: 'Canadá',
    description: 'El resort más grande de Norteamérica, con un terreno épico y un pueblo vibrante.',
    image_url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80',
    runs: 200,
    lifts: 37,
    elevation: '2,284m',
    rating: 4.9,
    price_from: '$2,450',
    difficulty: 'Experto'
  },
  {
    id: 'chamonix-mont-blanc',
    name: 'Chamonix-Mont-Blanc',
    country: 'Francia',
    description: 'La cuna del alpinismo, ofreciendo descensos legendarios a la sombra del Mont Blanc.',
    image_url: 'https://images.unsplash.com/photo-1549444133-725350488661?w=1200&q=80',
    runs: 157,
    lifts: 42,
    elevation: '3,842m',
    rating: 4.8,
    price_from: '$2,100',
    difficulty: 'Avanzado'
  },
  {
    id: 'zermatt-matterhorn',
    name: 'Zermatt Matterhorn',
    country: 'Suiza',
    description: 'Esquía bajo la icónica pirámide del Matterhorn en un pueblo libre de autos.',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    runs: 360,
    lifts: 52,
    elevation: '3,883m',
    rating: 5.0,
    price_from: '$3,200',
    difficulty: 'Intermedio'
  },
  {
    id: 'vail-resort',
    name: 'Vail Resort',
    country: 'USA',
    description: 'Famoso por sus "Back Bowls" y un servicio de lujo inigualable en Colorado.',
    image_url: 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?w=1200&q=80',
    runs: 195,
    lifts: 31,
    elevation: '3,527m',
    rating: 4.9,
    price_from: '$2,800',
    difficulty: 'Intermedio'
  }
];

export const PACKAGES = [
  { id: '1', title: 'Aventura en los Alpes', destination: 'Chamonix, Francia', price: '$1,999', duration: '7 Días', rating: 4.9, image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80' },
  { id: '2', title: 'Lujo en las Rocallosas', destination: 'Aspen, Colorado', price: '$2,450', duration: '5 Días', rating: 4.8, image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=800&q=80' },
  { id: '3', title: 'Nieve Japonesa', destination: 'Niseko, Japón', price: '$3,100', duration: '10 Días', rating: 5.0, image: 'https://images.unsplash.com/photo-1546514355-7fdc90ccbd43?w=800&q=80' },
];
// @ts-nocheck
import { Resort } from '../types';

export const resorts: Resort[] = [
  {
    id: '1', slug: 'val-thorens', name: 'Val Thorens', country: 'Francia', region: 'Alpes Franceses',
    description: 'La estación de esquí más alta de Europa, con nieve garantizada.',
    longDescription: 'Val Thorens es la estación más alta de Europa a 2,300m, parte del dominio Les 3 Vallées con 600km de pistas. Su altitud garantiza nieve de noviembre a mayo. La estación ofrece ski-in/ski-out desde prácticamente todos los alojamientos, un snowpark de clase mundial, y una vibrante vida après-ski.',
    altitude: { base: 2300, peak: 3230 },
    trails: { total: 166, beginner: 29, intermediate: 76, advanced: 41, expert: 20 },
    lifts: 32, skiableArea: 600, snowReliability: 5,
    season: { start: 'Noviembre', end: 'Mayo' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 200, max: 400 }, difficulty: 'all-levels',
    highlights: ['Estación más alta de Europa', 'Les 3 Vallées — 600km', 'Nieve garantizada'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '2.5h' }],
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    gallery: [], rating: 4.8, continent: 'Europa',
    features: ['Snowpark', 'Ski nocturno', 'Spa'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '2', slug: 'chamonix-mont-blanc', name: 'Chamonix-Mont Blanc', country: 'Francia', region: 'Alpes Franceses',
    description: 'La cuna del alpinismo moderno, con vistas al Mont Blanc.',
    longDescription: 'Chamonix es una leyenda del esquí alpino. Ubicada al pie del Mont Blanc, ofrece algunos de los terrenos más desafiantes del mundo, incluyendo la legendaria Vallée Blanche.',
    altitude: { base: 1035, peak: 3842 },
    trails: { total: 119, beginner: 17, intermediate: 47, advanced: 35, expert: 20 },
    lifts: 47, skiableArea: 170, snowReliability: 4,
    season: { start: 'Diciembre', end: 'Abril' }, bestMonths: ['Febrero', 'Marzo'],
    priceRange: { min: 180, max: 380 }, difficulty: 'advanced',
    highlights: ['Vallée Blanche', 'Vista al Mont Blanc', 'Esquí extremo'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '1.5h' }],
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800',
    gallery: [], rating: 4.7, continent: 'Europa',
    features: ['Fuera de pista', 'Alpinismo'], apresSkiRating: 5, familyFriendly: false
  },
  {
    id: '3', slug: 'zermatt', name: 'Zermatt', country: 'Suiza', region: 'Valais',
    description: 'Esquí a los pies del icónico Matterhorn, 365 días al año.',
    longDescription: 'Zermatt es sinónimo de lujo alpino y vistas incomparables al Matterhorn. Es una de las pocas estaciones que ofrece esquí durante los 365 días del año gracias al glaciar del Klein Matterhorn.',
    altitude: { base: 1620, peak: 3883 },
    trails: { total: 200, beginner: 36, intermediate: 78, advanced: 56, expert: 30 },
    lifts: 52, skiableArea: 360, snowReliability: 5,
    season: { start: 'Todo el año', end: 'Todo el año' }, bestMonths: ['Diciembre', 'Enero', 'Febrero'],
    priceRange: { min: 300, max: 600 }, difficulty: 'all-levels',
    highlights: ['Vista al Matterhorn', 'Esquí todo el año', 'Pueblo sin coches'],
    nearbyAirports: [{ name: 'Zúrich (ZRH)', distance: '3.5h' }],
    image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=800',
    gallery: [], rating: 4.9, continent: 'Europa',
    features: ['Esquí glaciar', 'Lujo', 'Restaurantes Michelin'], apresSkiRating: 5, familyFriendly: true
  },
  {
    id: '4', slug: 'valle-nevado', name: 'Valle Nevado', country: 'Chile', region: 'Santiago',
    description: 'El centro de esquí más grande de Sudamérica.',
    longDescription: 'Ubicado en el corazón de los Andes chilenos, Valle Nevado ofrece la mejor nieve de la región y acceso a tres valles interconectados.',
    altitude: { base: 2860, peak: 3670 },
    trails: { total: 40, beginner: 4, intermediate: 14, advanced: 14, expert: 8 },
    lifts: 14, skiableArea: 40, snowReliability: 4,
    season: { start: 'Junio', end: 'Septiembre' }, bestMonths: ['Julio', 'Agosto'],
    priceRange: { min: 150, max: 300 }, difficulty: 'intermediate',
    highlights: ['Heliesquí', 'Nieve andina', 'A 1.5h de Santiago'],
    nearbyAirports: [{ name: 'Santiago (SCL)', distance: '1.5h' }],
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    gallery: [], rating: 4.5, continent: 'Sudamérica',
    features: ['Heli-ski', 'Spa', 'Sunset parties'], apresSkiRating: 3, familyFriendly: true
  },
  {
    id: '5', slug: 'niseko-united', name: 'Niseko United', country: 'Japón', region: 'Hokkaido',
    description: 'La mejor nieve polvo del mundo, "Japow".',
    longDescription: 'Niseko recibe más de 14 metros de nieve anuales. Es famoso por su nieve polvo ultraligera y sus bosques de abedules.',
    altitude: { base: 260, peak: 1308 },
    trails: { total: 70, beginner: 15, intermediate: 30, advanced: 15, expert: 10 },
    lifts: 28, skiableArea: 45, snowReliability: 5,
    season: { start: 'Diciembre', end: 'Abril' }, bestMonths: ['Enero', 'Febrero'],
    priceRange: { min: 180, max: 350 }, difficulty: 'intermediate',
    highlights: ['Japow (nieve polvo)', 'Onsen tradicionales', 'Esquí nocturno'],
    nearbyAirports: [{ name: 'Sapporo (CTS)', distance: '2.5h' }],
    image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=800',
    gallery: [], rating: 4.8, continent: 'Asia',
    features: ['Onsen', 'Esquí nocturno', 'Gastronomía japonesa'], apresSkiRating: 4, familyFriendly: true
  }
];
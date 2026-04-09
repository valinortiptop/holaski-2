// @ts-nocheck
import { Resort } from '../types';

export const resorts: Resort[] = [
  {
    id: '1', slug: 'val-thorens', name: 'Val Thorens', country: 'Francia', region: 'Alpes Franceses',
    description: 'La estación de esquí más alta de Europa, con nieve garantizada.',
    longDescription: 'Val Thorens es la estación más alta de Europa a 2,300m, parte del dominio esquiable más grande del mundo: Les 3 Vallées con 600km de pistas.',
    altitude: { base: 2300, peak: 3230 }, trails: { total: 166, beginner: 29, intermediate: 76, advanced: 41, expert: 20 },
    lifts: 32, skiableArea: 600, snowReliability: 5,
    season: { start: 'Noviembre', end: 'Mayo' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 200, max: 400 }, difficulty: 'all-levels',
    highlights: ['Estación más alta de Europa', 'Les 3 Vallées — 600km', 'Nieve garantizada'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '2.5h' }],
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80', gallery: [],
    rating: 4.8, continent: 'Europa', features: ['Snowpark', 'Spa'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '2', slug: 'vail', name: 'Vail', country: 'EE.UU.', region: 'Colorado',
    description: 'El resort más grande de EE.UU., con los legendarios Back Bowls.',
    longDescription: 'Vail es sinónimo de esquí en América. Más de 2,140 hectáreas esquiables. Los Back Bowls ofrecen 1,200 hectáreas de polvo virgen.',
    altitude: { base: 2475, peak: 3527 }, trails: { total: 195, beginner: 35, intermediate: 95, advanced: 45, expert: 20 },
    lifts: 31, skiableArea: 2140, snowReliability: 4,
    season: { start: 'Noviembre', end: 'Abril' }, bestMonths: ['Enero', 'Febrero'],
    priceRange: { min: 250, max: 500 }, difficulty: 'intermediate',
    highlights: ['Back Bowls legendarios', 'Villa bávara peatonal', 'Epic Pass'],
    nearbyAirports: [{ name: 'Denver (DEN)', distance: '2h' }],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', gallery: [],
    rating: 4.9, continent: 'Norteamérica', features: ['Back Bowls', 'Epic Pass'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '3', slug: 'valle-nevado', name: 'Valle Nevado', country: 'Chile', region: 'Andes',
    description: 'El centro de esquí más moderno de Sudamérica.',
    longDescription: 'Ubicado a 3,025m de altura, ofrece la mejor calidad de nieve del hemisferio sur.',
    altitude: { base: 2860, peak: 3670 }, trails: { total: 40, beginner: 8, intermediate: 15, advanced: 12, expert: 5 },
    lifts: 14, skiableArea: 900, snowReliability: 4,
    season: { start: 'Junio', end: 'Octubre' }, bestMonths: ['Julio', 'Agosto'],
    priceRange: { min: 150, max: 300 }, difficulty: 'all-levels',
    highlights: ['Heliesquí', 'Nieve de alta calidad', 'Vistas de los Andes'],
    nearbyAirports: [{ name: 'Santiago (SCL)', distance: '1.5h' }],
    image: 'https://images.unsplash.com/photo-1518050912313-a93173f3b1c9?w=800&q=80', gallery: [],
    rating: 4.7, continent: 'Sudamérica', features: ['Heliesquí', 'Hoteles premium'], apresSkiRating: 3, familyFriendly: true
  }
];
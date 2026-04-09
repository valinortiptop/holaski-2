// @ts-nocheck
import { Resort } from '../types';

export const resorts: Resort[] = [
  {
    id: '1', slug: 'val-thorens', name: 'Val Thorens', country: 'Francia', region: 'Alpes Franceses',
    description: 'La estación de esquí más alta de Europa, nieve garantizada y acceso a Les 3 Vallées (600km).',
    longDescription: 'Val Thorens es la estación más alta de Europa a 2,300m, parte del dominio esquiable más grande del mundo: Les 3 Vallées con 600km de pistas. Su altitud garantiza nieve de noviembre a mayo. Ofrece ski-in/ski-out, un snowpark de clase mundial y vibrante vida après-ski.',
    altitude: { base: 2300, peak: 3230 },
    trails: { total: 166, beginner: 29, intermediate: 76, advanced: 41, expert: 20 },
    lifts: 32, skiableArea: 600, snowReliability: 5,
    season: { start: 'Noviembre', end: 'Mayo' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 200, max: 400 }, difficulty: 'all-levels',
    highlights: ['Estación más alta de Europa', 'Les 3 Vallées — 600km', 'Nieve garantizada', 'Ski-in/Ski-out'],
    nearbyAirports: [{ name: 'Chambéry (CMF)', distance: '2h' }, { name: 'Ginebra (GVA)', distance: '2.5h' }],
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
    rating: 4.8, continent: 'Europa',
    features: ['Snowpark', 'Ski nocturno', 'Spa', 'Restaurantes gourmet'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '2', slug: 'chamonix-mont-blanc', name: 'Chamonix-Mont Blanc', country: 'Francia', region: 'Alpes Franceses',
    description: 'Cuna del alpinismo moderno, vistas al Mont Blanc y esquí extremo de clase mundial.',
    longDescription: 'Chamonix es una leyenda del esquí alpino. Al pie del Mont Blanc (4,808m), ofrece terrenos extremos incluyendo la legendaria Vallée Blanche, un descenso fuera de pista de 20km.',
    altitude: { base: 1035, peak: 3842 },
    trails: { total: 119, beginner: 17, intermediate: 47, advanced: 35, expert: 20 },
    lifts: 47, skiableArea: 170, snowReliability: 4,
    season: { start: 'Diciembre', end: 'Abril' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 180, max: 380 }, difficulty: 'advanced',
    highlights: ['Vallée Blanche', 'Mont Blanc 4,808m', 'Terreno Extremo'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '1.5h' }],
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=80',
    rating: 4.7, continent: 'Europa',
    features: ['Fuera de pista', 'Heli-ski', 'Alpinismo'], apresSkiRating: 5, familyFriendly: false
  },
  {
    id: '3', slug: 'zermatt', name: 'Zermatt', country: 'Suiza', region: 'Valais',
    description: 'Esquí a los pies del icónico Matterhorn, 365 días del año.',
    longDescription: 'Zermatt es sinónimo de lujo alpino con vistas incomparables al Matterhorn. Esquí todo el año gracias al glaciar del Klein Matterhorn. Pueblo sin coches con ambiente exclusivo.',
    altitude: { base: 1620, peak: 3883 },
    trails: { total: 200, beginner: 36, intermediate: 78, advanced: 56, expert: 30 },
    lifts: 52, skiableArea: 360, snowReliability: 5,
    season: { start: 'Todo el año', end: 'Todo el año' }, bestMonths: ['Dic', 'Ene', 'Feb', 'Mar'],
    priceRange: { min: 300, max: 600 }, difficulty: 'all-levels',
    highlights: ['Vista al Matterhorn', 'Esquí 365 días', 'Pueblo sin coches', 'Lujo alpino'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '3h' }],
    image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=800&q=80',
    rating: 4.9, continent: 'Europa',
    features: ['Esquí glaciar', 'Spa', 'Heli-ski'], apresSkiRating: 5, familyFriendly: true
  },
  {
    id: '10', slug: 'vail', name: 'Vail', country: 'Estados Unidos', region: 'Colorado',
    description: 'El resort más grande de EE.UU., con los legendarios Back Bowls.',
    longDescription: 'Vail es sinónimo de esquí en América. Más de 2,140 hectáreas esquiables incluyendo los legendarios Back Bowls con 1,200 hectáreas de polvo virgen.',
    altitude: { base: 2475, peak: 3527 },
    trails: { total: 195, beginner: 35, intermediate: 95, advanced: 45, expert: 20 },
    lifts: 31, skiableArea: 2140, snowReliability: 4,
    season: { start: 'Noviembre', end: 'Abril' }, bestMonths: ['Dic', 'Ene', 'Feb', 'Mar'],
    priceRange: { min: 200, max: 450 }, difficulty: 'all-levels',
    highlights: ['Más grande de EE.UU.', 'Back Bowls legendarios', 'Epic Pass'],
    nearbyAirports: [{ name: 'Eagle/Vail (EGE)', distance: '35min' }, { name: 'Denver (DEN)', distance: '2h' }],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    rating: 4.7, continent: 'Norteamérica',
    features: ['Back Bowls', 'Epic Pass', 'Villa peatonal'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '14', slug: 'park-city', name: 'Park City', country: 'Estados Unidos', region: 'Utah',
    description: 'El resort más accesible de clase mundial, a 45min de Salt Lake City.',
    longDescription: 'Park City combina dos áreas gigantes con 330+ pistas. A solo 45min del aeropuerto de Salt Lake City. Utah es famosa por tener "The Greatest Snow on Earth".',
    altitude: { base: 2072, peak: 3050 },
    trails: { total: 330, beginner: 30, intermediate: 160, advanced: 100, expert: 40 },
    lifts: 41, skiableArea: 2954, snowReliability: 5,
    season: { start: 'Noviembre', end: 'Abril' }, bestMonths: ['Ene', 'Feb', 'Mar'],
    priceRange: { min: 180, max: 400 }, difficulty: 'all-levels',
    highlights: ['The Greatest Snow on Earth', 'Resort más accesible', 'Sundance Film Festival'],
    nearbyAirports: [{ name: 'Salt Lake City (SLC)', distance: '45min' }],
    image: 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?w=800&q=80',
    rating: 4.6, continent: 'Norteamérica',
    features: ['Cerca de aeropuerto', 'Sundance', 'Histórico'], apresSkiRating: 4, familyFriendly: true
  }
];
// @ts-nocheck
import { Resort } from '../types';

export const resorts: Resort[] = [
  {
    id: '1', slug: 'val-thorens', name: 'Val Thorens', country: 'Francia', region: 'Alpes Franceses',
    description: 'La estación de esquí más alta de Europa, con nieve garantizada y acceso a Les 3 Vallées (600km).',
    longDescription: 'Val Thorens es la estación más alta de Europa a 2,300m, parte del dominio esquiable más grande del mundo: Les 3 Vallées con 600km de pistas. Su altitud garantiza nieve de noviembre a mayo. Ofrece ski-in/ski-out, un snowpark de clase mundial y vibrante vida après-ski. Perfecta para todos los niveles.',
    altitude: { base: 2300, peak: 3230 },
    trails: { total: 166, beginner: 29, intermediate: 76, advanced: 41, expert: 20 },
    lifts: 32, skiableArea: 600, snowReliability: 5,
    season: { start: 'Noviembre', end: 'Mayo' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 200, max: 400 }, difficulty: 'all-levels',
    highlights: ['Estación más alta de Europa', 'Les 3 Vallées — 600km', 'Nieve garantizada Nov-May', 'Ski-in/Ski-out', 'Snowpark de clase mundial'],
    nearbyAirports: [{ name: 'Chambéry (CMF)', distance: '2h' }, { name: 'Ginebra (GVA)', distance: '2.5h' }],
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
    rating: 4.8, continent: 'Europa',
    features: ['Snowpark', 'Ski nocturno', 'Spa', 'Restaurantes gourmet'], apresSkiRating: 4, familyFriendly: true
  },
  {
    id: '2', slug: 'chamonix-mont-blanc', name: 'Chamonix-Mont Blanc', country: 'Francia', region: 'Alpes Franceses',
    description: 'La cuna del alpinismo moderno, con vistas al Mont Blanc y esquí extremo de clase mundial.',
    longDescription: 'Chamonix es una leyenda del esquí alpino. Al pie del Mont Blanc (4,808m), ofrece terrenos extremos incluyendo la legendaria Vallée Blanche, un descenso fuera de pista de 20km. Pueblo auténtico con excelente gastronomía y vida nocturna vibrante.',
    altitude: { base: 1035, peak: 3842 },
    trails: { total: 119, beginner: 17, intermediate: 47, advanced: 35, expert: 20 },
    lifts: 47, skiableArea: 170, snowReliability: 4,
    season: { start: 'Diciembre', end: 'Abril' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 180, max: 380 }, difficulty: 'advanced',
    highlights: ['Vallée Blanche — 20km fuera de pista', 'Vista al Mont Blanc 4,808m', 'Aiguille du Midi 3,842m', 'Pueblo auténtico de montaña'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '1.5h' }],
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=80',
    rating: 4.7, continent: 'Europa',
    features: ['Fuera de pista', 'Heli-ski', 'Alpinismo', 'Restaurantes Michelin'], apresSkiRating: 5, familyFriendly: false
  },
  {
    id: '3', slug: 'zermatt', name: 'Zermatt', country: 'Suiza', region: 'Valais',
    description: 'Esquí a los pies del icónico Matterhorn, con esquí los 365 días del año.',
    longDescription: 'Zermatt es sinónimo de lujo alpino y vistas incomparables al Matterhorn. Ofrece esquí todo el año gracias al glaciar del Klein Matterhorn. Pueblo sin coches con ambiente exclusivo. Conecta con Cervinia, Italia, para 360km de pistas.',
    altitude: { base: 1620, peak: 3883 },
    trails: { total: 200, beginner: 36, intermediate: 78, advanced: 56, expert: 30 },
    lifts: 52, skiableArea: 360, snowReliability: 5,
    season: { start: 'Todo el año', end: 'Todo el año' }, bestMonths: ['Diciembre', 'Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 300, max: 600 }, difficulty: 'all-levels',
    highlights: ['Vista al Matterhorn', 'Esquí 365 días/año', 'Pueblo sin coches', 'Conexión Cervinia (Italia)', 'Lujo alpino supremo'],
    nearbyAirports: [{ name: 'Ginebra (GVA)', distance: '3h' }, { name: 'Zúrich (ZRH)', distance: '3.5h' }],
    image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=800&q=80',
    rating: 4.9, continent: 'Europa',
    features: ['Esquí glaciar', 'Pueblo sin coches', 'Spa', 'Restaurantes Michelin', 'Heli-ski'], apresSkiRating: 5, familyFriendly: true
  },
  {
    id: '4', slug: 'jackson-hole', name: 'Jackson Hole', country: 'Estados Unidos', region: 'Wyoming',
    description: 'El terreno más empinado de Norteamérica, famoso por Corbet\'s Couloir.',
    longDescription: 'Jackson Hole es sinónimo de esquí extremo. Desnivel vertical de 1,262m y el legendario Corbet\'s Couloir. Pueblo western auténtico cerca del Parque Nacional Yellowstone. Para esquiadores expertos.',
    altitude: { base: 1924, peak: 3185 },
    trails: { total: 133, beginner: 13, intermediate: 53, advanced: 40, expert: 27 },
    lifts: 13, skiableArea: 1011, snowReliability: 4,
    season: { start: 'Diciembre', end: 'Abril' }, bestMonths: ['Enero', 'Febrero', 'Marzo'],
    priceRange: { min: 180, max: 400 }, difficulty: 'advanced',
    highlights: ['Corbet\'s Couloir', 'Terreno extremo', 'Pueblo western', 'Yellowstone cercano'],
    nearbyAirports: [{ name: 'Jackson Hole (JAC)', distance: '20min' }],
    image: 'https://images.unsplash.com/photo-1548777123-e196e43ee0e8?w=800&q=80',
    rating: 4.8, continent: 'Norteamérica',
    features: ['Tram', 'Corbet\'s Couloir', 'Western Village'], apresSkiRating: 4, familyFriendly: false
  }
];
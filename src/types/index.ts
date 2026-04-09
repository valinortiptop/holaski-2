// @ts-nocheck
export interface Resort {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  longDescription: string;
  altitude: { base: number; peak: number };
  trails: { total: number; beginner: number; intermediate: number; advanced: number; expert: number };
  lifts: number;
  skiableArea: number;
  snowReliability: number;
  season: { start: string; end: string };
  bestMonths: string[];
  priceRange: { min: number; max: number };
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'all-levels';
  highlights: string[];
  nearbyAirports: { name: string; distance: string }[];
  image: string;
  gallery: string[];
  rating: number;
  continent: 'Europa' | 'Norteamérica' | 'Sudamérica' | 'Asia';
  features: string[];
  apresSkiRating: number;
  familyFriendly: boolean;
}
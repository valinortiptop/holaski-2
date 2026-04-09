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
  skiableArea: number; // in hectares or km
  snowReliability: number; // 1-5
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

export interface TripPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: number;
  resorts: string[]; // names or slugs
  priceFrom: number;
  includes: string[];
  highlights: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  image: string;
  bestFor: string[];
  season: string;
}
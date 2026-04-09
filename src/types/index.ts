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
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  highlights: string[];
  nearbyAirports: { name: string; distance: string }[];
  image: string;
  rating: number;
  continent: string;
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
  resortNames: string[];
  priceFrom: number;
  includes: string[];
  highlights: string[];
  difficulty: string;
  image: string;
  bestFor: string[];
  season: string;
}
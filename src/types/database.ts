// @ts-nocheck
export interface Resort {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  altitude_top: number;
  altitude_base: number;
  runs_total: number;
  lifts_total: number;
  difficulty_json: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  description: string;
  price_level: number;
  image_url: string;
  gallery_urls?: string[];
  created_at: string;
}

export interface TripPackage {
  id: string;
  slug: string;
  name: string;
  destination: string;
  duration_days: number;
  price_from: number;
  image_url: string;
  description: string;
  difficulty: string;
  highlights: string[];
  created_at: string;
}
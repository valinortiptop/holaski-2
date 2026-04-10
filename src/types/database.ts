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
  price_level: number;
  image_url: string;
  description: string;
  created_at?: string;
}

export interface Package {
  id: string;
  resort_id: string;
  name: string;
  description: string;
  price_usd: number;
  duration_days: number;
  includes: string[];
  image_url: string;
  featured: boolean;
  resort?: Resort;
}
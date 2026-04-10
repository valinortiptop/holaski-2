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
}

export interface TripPackage {
  id: string;
  name: string;
  destination: string;
  duration_days: number;
  price_from: number;
  image_url: string;
  difficulty: string;
  package_data?: any;
}

export interface Lead {
  id?: string;
  first_name: string;
  email: string;
  destination?: string;
  travel_dates?: string;
  passengers_adults?: number;
  passengers_children?: number;
  skill_level?: string;
  budget_range?: string;
  message?: string;
  created_at?: string;
}
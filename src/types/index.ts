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
    green: number;
    blue: number;
    red: number;
    black: number;
  };
  description: string;
  price_level: number; // 1-3
  image_url: string;
  gallery_urls: string[];
}

export interface Lead {
  email: string;
  first_name?: string;
  last_name?: string;
  destination?: string;
  travel_dates?: string;
  passengers_adults?: number;
  passengers_children?: number;
  skill_level?: string;
  budget_range?: string;
  message?: string;
}
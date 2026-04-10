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
    principiante: number;
    intermedio: number;
    avanzado: number;
    experto: number;
  };
  description: string;
  price_level: number;
  image_url: string;
  gallery_urls: string[];
  created_at: string;
}

export interface Lead {
  id: string;
  first_name: string;
  email: string;
  destination: string;
  travel_dates: string;
  passengers_adults: number;
  passengers_children: number;
  skill_level: string;
  budget_range: string;
  message: string;
  created_at: string;
}
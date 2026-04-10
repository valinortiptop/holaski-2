// @ts-nocheck
export interface Resort {
  id: string;
  name: string;
  region: string;
  country: string;
  price_level: 1 | 2 | 3;
  vertical_drop?: string;
  difficulty_stats?: {
    easy: number;
    intermediate: number;
    advanced: number;
  };
  image_url?: string;
  description?: string;
}

export interface TripPackage {
  id: string;
  name: string;
  destination: string;
  duration_days: number;
  price_from: number;
  image_url?: string;
  description?: string;
  difficulty: string;
  package_data: {
    features?: string[];
    accommodation?: string;
    itinerary?: string[];
  };
}

export interface Lead {
  id?: string;
  first_name: string;
  email: string;
  destination?: string;
  travel_dates?: string;
  passengers_adults: number;
  passengers_children: number;
  skill_level: string;
  budget_range: string;
  message?: string;
  status?: string;
}
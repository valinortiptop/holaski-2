// @ts-nocheck
export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  destination_id: string;
  price: number;
  duration_days: number;
  description: string | null;
  image_url: string | null;
  inclusions: string[];
  featured: boolean;
  created_at: string;
  destination?: Destination;
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
  message: string | null;
  created_at: string;
}
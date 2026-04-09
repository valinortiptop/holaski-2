// @ts-nocheck
export interface Lead {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  destination: string | null;
  travel_dates: string | null;
  passengers_adults: number;
  passengers_children: number;
  skill_level: string | null;
  budget_range: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
}

export interface Resort {
  id: string;
  name: string;
  slug: string;
  country: string;
  region: string;
  description: string;
  stats: {
    altitude: string;
    slopes: string;
    lifts: string;
    difficulty: {
      easy: number;
      intermediate: number;
      advanced: number;
    };
  };
  image_url: string;
  category: 'lux' | 'family' | 'party' | 'pro';
}
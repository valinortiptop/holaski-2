// @ts-nocheck
export interface Resort {
  id: string;
  name: string;
  location?: string;
  description?: string;
  image_url?: string;
  base_price_per_day?: number;
}

export interface GeneratedPlan {
  resort_name: string;
  hotel: {
    name: string;
    description: string;
    stars: number;
  };
  itinerary: {
    day: number;
    activity: string;
    suggestion: string;
  }[];
  cost_breakdown: {
    hotel: number;
    ski_pass: number;
    equipment: number;
    total_per_person_usd: number;
  };
}
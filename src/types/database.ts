// @ts-nocheck
export interface SkiResort {
  id: string;
  name: string;
  country: string;
  description: string;
  image_url: string;
  price_level: number;
  rating: number;
  difficulty_distribution?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  amenities?: string[];
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      ski_resorts: {
        Row: SkiResort;
        Insert: Omit<SkiResort, 'id' | 'created_at'>;
        Update: Partial<Omit<SkiResort, 'id' | 'created_at'>>;
      };
    };
  };
};
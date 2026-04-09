export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface AISearchResult {
  id: string;
  resort_name: string;
  country: string;
  region: string;
  price_range_usd: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  highlights: string[];
  rating: number;
  image_url: string;
  match_score: number;
  why_it_matches: string;
}

export interface Database {
  public: {
    Tables: {
      resorts: {
        Row: {
          id: string
          name: string
          country: string
          region: string
          description_es: string | null
          description_en: string | null
          difficulty: string
          altitude_base_m: number | null
          altitude_peak_m: number | null
          total_runs: number | null
          total_lifts: number | null
          season_start: string | null
          season_end: string | null
          avg_snowfall_cm: number | null
          image_url: string | null
          latitude: number | null
          longitude: number | null
          avg_daily_cost_usd: number | null
          highlights: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          country: string
          region: string
          description_es?: string | null
          description_en?: string | null
          difficulty: string
          altitude_base_m?: number | null
          altitude_peak_m?: number | null
          total_runs?: number | null
          total_lifts?: number | null
          season_start?: string | null
          season_end?: string | null
          avg_snowfall_cm?: number | null
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          avg_daily_cost_usd?: number | null
          highlights?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          region?: string
          description_es?: string | null
          description_en?: string | null
          difficulty?: string
          altitude_base_m?: number | null
          altitude_peak_m?: number | null
          total_runs?: number | null
          total_lifts?: number | null
          season_start?: string | null
          season_end?: string | null
          avg_snowfall_cm?: number | null
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          avg_daily_cost_usd?: number | null
          highlights?: string[] | null
          created_at?: string
        }
      }
    }
  }
}
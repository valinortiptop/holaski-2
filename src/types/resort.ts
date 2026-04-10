// @ts-nocheck
// src/types/resort.ts
export interface DifficultyJson {
  beginner: number;
  intermediate: number;
  advanced: number;
}

export interface Resort {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  altitude_top: number | null;
  altitude_base: number | null;
  runs_total: number | null;
  lifts_total: number | null;
  difficulty_json: DifficultyJson | string | null;
  price_level: number | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  description: string | null;
  created_at: string;
}
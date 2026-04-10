// @ts-nocheck
export interface DifficultyBreakdown {
  principiante: number;
  intermedio: number;
  avanzado: number;
  experto: number;
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
  difficulty_json: DifficultyBreakdown | null;
  description: string | null;
  price_level: number | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  created_at: string;
}

export type RegionFilter = 'Todos' | 'Europa' | 'Norteamérica' | 'Sudamérica' | 'Asia';

export const REGION_COUNTRY_MAP: Record<RegionFilter, string[]> = {
  'Todos': [],
  'Europa': ['Francia', 'Suiza', 'Italia', 'Austria', 'Alemania', 'Noruega', 'Suecia', 'España', 'Andorra'],
  'Norteamérica': ['EE.UU.', 'Canadá', 'México'],
  'Sudamérica': ['Chile', 'Argentina', 'Bolivia', 'Perú'],
  'Asia': ['Japón', 'Corea del Sur', 'China', 'India'],
};
// @ts-nocheck
// src/types/database.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resorts: {
        Row: {
          id: string
          slug: string
          name: string
          region: string | null
          country: string
          altitude_top: number | null
          altitude_base: number | null
          runs_total: number | null
          lifts_total: number | null
          difficulty_json: Json
          price_level: number
          image_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          region?: string | null
          country: string
          altitude_top?: number | null
          altitude_base?: number | null
          runs_total?: number | null
          lifts_total?: number | null
          difficulty_json?: Json
          price_level?: number
          image_url?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          region?: string | null
          country?: string
          altitude_top?: number | null
          altitude_base?: number | null
          runs_total?: number | null
          lifts_total?: number | null
          difficulty_json?: Json
          price_level?: number
          image_url?: string | null
          description?: string | null
          created_at?: string
        }
      }
    }
  }
}

export type Resort = Database['public']['Tables']['resorts']['Row'];
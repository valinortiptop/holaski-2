// @ts-nocheck
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  (import.meta.env.VITE_SUPABASE_URL || "https://kmehmrtrktgqdiafitkv.supabase.co"),
  (import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWhtcnRya3RncWRpYWZpdGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTAwMjYsImV4cCI6MjA5MDQ2NjAyNn0.VlUEPTOZBgRQ5Hm6zKNNYOQSEVv_0OGbjasCcl1Ol4s")
);
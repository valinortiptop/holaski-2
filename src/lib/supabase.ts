// @ts-nocheck
import { createClient } from '@supabase/supabase-client';
import type { Database } from '../types/supabase';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "https://kmehmrtrktgqdiafitkv.supabase.co") || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWhtcnRya3RncWRpYWZpdGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTAwMjYsImV4cCI6MjA5MDQ2NjAyNn0.VlUEPTOZBgRQ5Hm6zKNNYOQSEVv_0OGbjasCcl1Ol4s") || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
// @ts-nocheck
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "https://kmehmrtrktgqdiafitkv.supabase.co") || 'https://kmehmrtrktgqdiafitkv.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWhtcnRya3RncWRpYWZpdGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTAwMjYsImV4cCI6MjA5MDQ2NjAyNn0.VlUEPTOZBgRQ5Hm6zKNNYOQSEVv_0OGbjasCcl1Ol4s") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWhtcnRya3RncWRpYWZpdGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE1NTcsImV4cCI6MjA1OTc5NzU1N30.iy9P19TDHQO0i4rt6JyP_mVYp-8Z4sMR2eamsMxfXbg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
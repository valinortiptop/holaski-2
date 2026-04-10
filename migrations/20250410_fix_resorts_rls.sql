-- migrations/20250410_fix_resorts_rls.sql

-- Ensure RLS is enabled
ALTER TABLE public.resorts ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can view resorts" ON public.resorts;
DROP POLICY IF EXISTS "allow_public_read_resorts" ON public.resorts;
DROP POLICY IF EXISTS "public_read_resorts" ON public.resorts;

-- Create a clean public read policy
CREATE POLICY "public_read_resorts" ON public.resorts
  FOR SELECT
  TO public, anon, authenticated
  USING (true);
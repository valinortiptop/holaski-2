-- migrations/001_init.sql
CREATE TABLE IF NOT EXISTS ski_resorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  description text,
  image_url text,
  runs integer,
  lifts integer,
  elevation text,
  rating decimal(3,1),
  price_from text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamp with time zone DEFAULT now(),
  unsubscribed boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS
ALTER TABLE ski_resorts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON ski_resorts;
CREATE POLICY "Allow public read access" ON ski_resorts FOR SELECT TO public USING (true);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
CREATE POLICY "Allow public insert" ON newsletter_subscribers FOR INSERT TO public WITH CHECK (true);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert contact" ON contact_inquiries;
CREATE POLICY "Allow public insert contact" ON contact_inquiries FOR INSERT TO public WITH CHECK (true);
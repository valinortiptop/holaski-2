-- migrations/002_contact_inquiries.sql
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON contact_inquiries;
CREATE POLICY "Anyone can insert inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- Seed more ski resorts if table is empty or has few
INSERT INTO ski_resorts (id, name, country, description, image_url)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Whistler Blackcomb', 'Canadá', 'El resort más grande de Norteamérica con más de 8,000 acres de terreno esquiable, dos montañas interconectadas y una vibrante villa alpina.', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Vail', 'Estados Unidos', 'Legendario resort en Colorado con 5,317 acres de terreno, famoso por sus Back Bowls y su encantadora villa de estilo tirolés.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Chamonix Mont-Blanc', 'Francia', 'La capital mundial del alpinismo y esquí extremo, al pie del Mont Blanc con vistas espectaculares y terreno desafiante.', 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&q=80'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Zermatt', 'Suiza', 'Resort icónico dominado por el Matterhorn, con esquí durante todo el año, hoteles de lujo y un encantador pueblo sin coches.', 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=80'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Niseko', 'Japón', 'Famoso mundialmente por su nieve polvo legendaria, con cuatro resorts interconectados y una cultura après-ski única.', 'https://images.unsplash.com/photo-1542359649-6bfbeb8291f0?w=800&q=80'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'St. Anton am Arlberg', 'Austria', 'Cuna del esquí alpino moderno con 300km de pistas, legendaria vida nocturna y auténtico encanto tirolés.', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80'),
  ('a1b2c3d4-0007-4000-8000-000000000007', 'Aspen', 'Estados Unidos', 'Cuatro montañas exclusivas en Colorado con esquí de clase mundial, restaurantes gourmet y una escena cultural vibrante.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80'),
  ('a1b2c3d4-0008-4000-8000-000000000008', 'Verbier', 'Suiza', 'Paraíso del freeride en los Alpes suizos con terreno extremo, vistas panorámicas y ambiente internacional sofisticado.', 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone DEFAULT now(),
  unsubscribed boolean DEFAULT false
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
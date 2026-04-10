CREATE TABLE IF NOT EXISTS resorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  altitude_top INTEGER,
  altitude_base INTEGER,
  runs_total INTEGER,
  lifts_total INTEGER,
  difficulty_json JSONB DEFAULT '{"principiante": 25, "intermedio": 40, "avanzado": 25, "experto": 10}'::jsonb,
  description TEXT,
  price_level INTEGER DEFAULT 3,
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE resorts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resorts_public_read" ON resorts;
CREATE POLICY "resorts_public_read" ON resorts FOR SELECT USING (true);

-- Seed Data
INSERT INTO resorts (slug, name, region, country, altitude_top, altitude_base, runs_total, lifts_total, price_level, description, difficulty_json, image_url) VALUES
('courchevel', 'Courchevel', 'Alpes Franceses', 'Francia', 2738, 1300, 150, 58, 5, 'El resort más lujoso de los Alpes franceses, parte del dominio Les 3 Vallées.', '{"principiante": 25, "intermedio": 35, "avanzado": 30, "experto": 10}', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=1200'),
('zermatt', 'Zermatt', 'Alpes Suizos', 'Suiza', 3899, 1620, 200, 52, 5, 'Dominado por el Matterhorn, ofrece el esquí de verano más alto de Europa.', '{"principiante": 20, "intermedio": 35, "avanzado": 30, "experto": 15}', 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&q=80&w=1200'),
('vail', 'Vail', 'Colorado', 'EE.UU.', 3527, 2475, 195, 31, 5, 'El resort más grande de Colorado con los famosos Back Bowls.', '{"principiante": 18, "intermedio": 29, "avanzado": 36, "experto": 17}', 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&q=80&w=1200'),
('niseko-united', 'Niseko United', 'Hokkaido', 'Japón', 1308, 256, 70, 30, 3, 'La nieve más ligera del planeta con 15 metros de polvo cada temporada.', '{"principiante": 30, "intermedio": 40, "avanzado": 20, "experto": 10}', 'https://images.unsplash.com/photo-1549137701-97232204c3e8?auto=format&fit=crop&q=80&w=1200'),
('valle-nevado', 'Valle Nevado', 'Andes Centrales', 'Chile', 3670, 2860, 44, 14, 3, 'El resort más grande de Sudamérica, a solo 90 minutos de Santiago.', '{"principiante": 25, "intermedio": 35, "avanzado": 25, "experto": 15}', 'https://images.unsplash.com/photo-1516466723207-f17de0083f27?auto=format&fit=crop&q=80&w=1200');
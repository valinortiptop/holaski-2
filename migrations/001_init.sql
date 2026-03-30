-- migrations/001_init.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trip_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  package_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ski_resorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

INSERT INTO ski_resorts (name, country, description, image_url) VALUES
('Valle Nevado', 'Chile', 'El centro de esquí más grande de Sudamérica.', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800'),
('Cerro Catedral', 'Argentina', 'El más grande en pistas, en Bariloche.', 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'),
('Aspen Snowmass', 'USA', 'Cuatro montañas legendarias en Colorado.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800')
ON CONFLICT DO NOTHING;
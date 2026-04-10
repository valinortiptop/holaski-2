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
  difficulty_json JSONB DEFAULT '{"beginner":33,"intermediate":33,"advanced":34}',
  price_level INTEGER DEFAULT 3, -- 1-5 scale
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE resorts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'resorts_public_read' AND tablename = 'resorts') THEN
    CREATE POLICY "resorts_public_read" ON resorts FOR SELECT USING (true);
  END IF;
END $$;

INSERT INTO resorts (slug, name, region, country, altitude_top, altitude_base, runs_total, lifts_total, difficulty_json, price_level, image_url, description) VALUES
('chamonix', 'Chamonix Mont-Blanc', 'Haute-Savoie', 'Francia', 3842, 1035, 182, 47, '{"beginner":15,"intermediate":35,"advanced":50}', 4, 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800', 'Capital mundial del alpinismo con la mítica Vallée Blanche.'),
('val-thorens', 'Val Thorens', 'Savoie', 'Francia', 3230, 2300, 150, 31, '{"beginner":20,"intermediate":45,"advanced":35}', 4, 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800', 'La estación más alta de Europa en Les 3 Vallées.'),
('zermatt', 'Zermatt', 'Valais', 'Suiza', 3883, 1620, 360, 52, '{"beginner":20,"intermediate":45,"advanced":35}', 5, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Al pie del Matterhorn con esquí los 365 días del año.'),
('ischgl', 'Ischgl', 'Tirol', 'Austria', 2872, 1377, 239, 45, '{"beginner":20,"intermediate":55,"advanced":25}', 4, 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?w=800', 'Famosa por su après-ski y conexión con Suiza.'),
('grandvalira', 'Grandvalira', 'Andorra', 'Andorra', 2640, 1710, 210, 74, '{"beginner":40,"intermediate":40,"advanced":20}', 3, 'https://images.unsplash.com/photo-1549137701-97232204c3e8?w=800', 'El dominio más grande de los Pirineos con sectores variados.'),
('baqueira-beret', 'Baqueira Beret', 'Val d''Aran', 'España', 2610, 1500, 167, 36, '{"beginner":35,"intermediate":45,"advanced":20}', 4, 'https://images.unsplash.com/photo-1551698618-1fed5d97530d?w=800', 'La estación más exclusiva de España con nieve de calidad atlántica.'),
('st-moritz', 'St. Moritz', 'Grisones', 'Suiza', 3303, 1750, 350, 56, '{"beginner":25,"intermediate":45,"advanced":30}', 5, 'https://images.unsplash.com/photo-1610039340929-40e47a8e9e5c?w=800', 'Cuna de las vacaciones de invierno de lujo.'),
('courchevel', 'Courchevel', 'Savoie', 'Francia', 2738, 1300, 150, 58, '{"beginner":25,"intermediate":40,"advanced":35}', 5, 'https://images.unsplash.com/photo-1610039340929-40e47a8e9e5c?w=800', 'Lujo extremo y pistas impecables en Les 3 Vallées.'),
('verbier', 'Verbier', 'Valais', 'Suiza', 3330, 1500, 412, 93, '{"beginner":20,"intermediate":35,"advanced":45}', 5, 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800', 'Meca del freeride en el dominio de los 4 Vallées.'),
('cervinia', 'Breuil-Cervinia', 'Valle de Aosta', 'Italia', 3480, 2050, 150, 23, '{"beginner":30,"intermediate":50,"advanced":20}', 4, 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800', 'Conectada con Zermatt, ofrece largas pistas soleadas.'),
('cortina', 'Cortina d''Ampezzo', 'Veneto', 'Italia', 2930, 1224, 120, 36, '{"beginner":40,"intermediate":35,"advanced":25}', 4, 'https://images.unsplash.com/photo-1548783300-70b41bc80b46?w=800', 'La Reina de los Dolomitas, patrimonio de la UNESCO.'),
('val-disere', 'Val d''Isère', 'Savoie', 'Francia', 3456, 1850, 150, 42, '{"beginner":15,"intermediate":40,"advanced":45}', 5, 'https://images.unsplash.com/photo-1548783300-70b41bc80b46?w=800', 'Esquí de alto nivel y un pueblo alpino tradicional.'),
('meribel', 'Méribel', 'Savoie', 'Francia', 2952, 1450, 150, 51, '{"beginner":25,"intermediate":40,"advanced":35}', 4, 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800', 'El corazón de Les 3 Vallées con arquitectura tradicional.'),
('tignes', 'Tignes', 'Savoie', 'Francia', 3456, 1550, 150, 38, '{"beginner":20,"intermediate":40,"advanced":40}', 4, 'https://images.unsplash.com/photo-1544152866-51173fe09b5c?w=800', 'Altitud garantizada y esquí en glaciar.'),
('la-plagne', 'La Plagne', 'Savoie', 'Francia', 3250, 1250, 225, 108, '{"beginner":30,"intermediate":40,"advanced":30}', 3, 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800', 'Enorme dominio familiar conectado por el Vanoise Express.'),
('les-arcs', 'Les Arcs', 'Savoie', 'Francia', 3226, 1200, 200, 54, '{"beginner":20,"intermediate":45,"advanced":35}', 4, 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?w=800', 'Resort moderno con excelente terreno variado y bosques.'),
('alpe-dhuez', 'Alpe d''Huez', 'Isère', 'Francia', 3330, 1120, 132, 68, '{"beginner":30,"intermediate":40,"advanced":30}', 3, 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800', 'La Isla al Sol, famosa por su desnivel y pistas negras micas.'),
('les-deux-alpes', 'Les Deux Alpes', 'Isère', 'Francia', 3600, 1300, 96, 47, '{"beginner":25,"intermediate":40,"advanced":35}', 3, 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800', 'Uno de los glaciares más grandes para esquiar en Europa.'),
('serre-chevalier', 'Serre Chevalier', 'Hautes-Alpes', 'Francia', 2800, 1200, 81, 61, '{"beginner":25,"intermediate":40,"advanced":35}', 3, 'https://images.unsplash.com/photo-1502209524164-acea936639a2?w=800', 'Dominio del sur con hermosos bosques de alerces.'),
('megève', 'Megève', 'Haute-Savoie', 'Francia', 2350, 1113, 219, 55, '{"beginner":30,"intermediate":45,"advanced":25}', 5, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Pueblo medieval encantador y gastronomía de estrellas Michelin.'),
('st-anton', 'St. Anton am Arlberg', 'Tirol', 'Austria', 2811, 1304, 305, 88, '{"beginner":30,"intermediate":40,"advanced":30}', 4, 'https://images.unsplash.com/photo-1502209524164-acea936639a2?w=800', 'Cuna del esquí alpino con el mejor après-ski del mundo.'),
('lech', 'Lech Zürs am Arlberg', 'Vorarlberg', 'Austria', 2811, 1450, 305, 88, '{"beginner":30,"intermediate":40,"advanced":30}', 5, 'https://images.unsplash.com/photo-1549137701-97232204c3e8?w=800', 'Refinado y exclusivo, parte del inmenso dominio de Arlberg.'),
('kitzbühel', 'Kitzbühel', 'Tirol', 'Austria', 2000, 800, 230, 57, '{"beginner":45,"intermediate":40,"advanced":15}', 5, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Hogar del Hahnenkamm, el descenso más difícil del mundo.'),
('mayrhofen', 'Mayrhofen', 'Tirol', 'Austria', 2500, 630, 142, 44, '{"beginner":25,"intermediate":45,"advanced":30}', 3, 'https://images.unsplash.com/photo-1544212574-0f7358a9805d?w=800', 'Valle de Zillertal con la pista Harakiri del 78% de pendiente.'),
('sölden', 'Sölden', 'Tirol', 'Austria', 3340, 1350, 144, 31, '{"beginner":25,"intermediate":45,"advanced":30}', 4, 'https://images.unsplash.com/photo-1548783300-70b41bc80b46?w=800', 'Escenario de James Bond con tres montañas de más de 3000m.'),
('saalbach', 'Saalbach-Hinterglemm', 'Salzburgo', 'Austria', 2096, 1003, 270, 70, '{"beginner":50,"intermediate":40,"advanced":10}', 4, 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?w=800', 'El Skicircus, un dominio conectado sin fin y fiesta garantizada.'),
('crans-montana', 'Crans-Montana', 'Valais', 'Suiza', 3000, 1500, 140, 27, '{"beginner":30,"intermediate":45,"advanced":25}', 4, 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800', 'Un balcón soleado con vistas panorámicas a los 4000s.'),
('davos', 'Davos Klosters', 'Grisones', 'Suiza', 2844, 810, 300, 57, '{"beginner":25,"intermediate":45,"advanced":30}', 5, 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800', 'Cinco montañas distintas y la pista más larga (12km) de la región.'),
('saas-fee', 'Saas-Fee', 'Valais', 'Suiza', 3600, 1800, 100, 22, '{"beginner":30,"intermediate":40,"advanced":30}', 4, 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800', 'La Perla de los Alpes, rodeada de 13 picos de 4000m.'),
('grindelwald', 'Grindelwald-Wengen', 'Oberland Bernés', 'Suiza', 2971, 943, 213, 42, '{"beginner":25,"intermediate":40,"advanced":35}', 4, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'A los pies de la cara norte del Eiger con el tren Jungfraujoch.'),
('livigno', 'Livigno', 'Lombardía', 'Italia', 2798, 1816, 115, 32, '{"beginner":30,"intermediate":50,"advanced":20}', 3, 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=800', 'Puerto libre de impuestos, nieve garantizada y gran snowpark.'),
('selva-val-gardena', 'Selva Val Gardena', 'Dolomitas', 'Italia', 2518, 1236, 175, 79, '{"beginner":30,"intermediate":55,"advanced":15}', 4, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'Puerta de entrada a la Sella Ronda en el corazón de los Dolomitas.'),
('madonna', 'Madonna di Campiglio', 'Trentino', 'Italia', 2500, 1522, 150, 57, '{"beginner":45,"intermediate":40,"advanced":15}', 4, 'https://images.unsplash.com/photo-1510344445350-0ca914ba08d4?w=800', 'Elegante y glamurosa, rodeada por los Dolomitas de Brenta.'),
('sestriere', 'Sestriere', 'Piamonte', 'Italia', 2823, 2035, 400, 70, '{"beginner":25,"intermediate":55,"advanced":20}', 3, 'https://images.unsplash.com/photo-1544212574-0f7358a9805d?w=800', 'Centro de la Vía Lattea, sede olímpica en 2006.'),
('valle-nevado', 'Valle Nevado', 'Metropolitana', 'Chile', 3670, 3025, 40, 14, '{"beginner":10,"intermediate":35,"advanced":55}', 4, 'https://images.unsplash.com/photo-1516108317508-6788f6a160e4?w=800', 'El resort más moderno de los Andes, famoso por su heliesquí.'),
('cerro-catedral', 'Cerro Catedral', 'Río Negro', 'Argentina', 2180, 1030, 120, 34, '{"beginner":30,"intermediate":40,"advanced":30}', 3, 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800', 'Vistas espectaculares al Lago Nahuel Huapi en Bariloche.'),
('las-lenas', 'Las Leñas', 'Mendoza', 'Argentina', 3430, 2240, 52, 14, '{"beginner":15,"intermediate":45,"advanced":40}', 4, 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800', 'Famoso mundialmente por sus canales de fuera de pista extremos.'),
('cerro-castor', 'Cerro Castor', 'Tierra del Fuego', 'Argentina', 1057, 195, 34, 12, '{"beginner":30,"intermediate":45,"advanced":25}', 3, 'https://images.unsplash.com/photo-1505833190673-c6d9309d57b8?w=800', 'La estación más austral del mundo con una calidad de nieve única.')
ON CONFLICT (slug) DO UPDATE SET 
  name=EXCLUDED.name, region=EXCLUDED.region, country=EXCLUDED.country, 
  altitude_top=EXCLUDED.altitude_top, altitude_base=EXCLUDED.altitude_base, 
  runs_total=EXCLUDED.runs_total, lifts_total=EXCLUDED.lifts_total, 
  difficulty_json=EXCLUDED.difficulty_json, price_level=EXCLUDED.price_level, 
  image_url=EXCLUDED.image_url, description=EXCLUDED.description;
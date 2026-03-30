-- migrations/002_seed_resorts.sql
INSERT INTO ski_resorts (id, name, country, description, image_url)
VALUES 
  (gen_random_uuid(), 'Whistler Blackcomb', 'Canada', 'El resort más grande de Norteamérica con más de 8,100 acres de terreno esquiable.', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Park City', 'Estados Unidos', 'El resort más grande de Estados Unidos en las montañas Wasatch de Utah.', 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Vail', 'Estados Unidos', 'Legendario resort en Colorado con 5,317 acres de terreno Back Bowl.', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Telluride', 'Estados Unidos', 'Un pintoresco pueblo minero convertido en destino de esquí de clase mundial.', 'https://images.unsplash.com/photo-1486728297118-82a07bc48a28?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Chamonix', 'Francia', 'La capital mundial del alpinismo al pie del Mont Blanc.', 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Zermatt', 'Suiza', 'Esquí con vistas al icónico Matterhorn durante toda la temporada.', 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Cerro Catedral', 'Argentina', 'El centro de esquí más grande de Sudamérica en Bariloche.', 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=400&fit=crop'),
  (gen_random_uuid(), 'Cortina d''Ampezzo', 'Italia', 'Sede olímpica 2026 en las espectaculares Dolomitas italianas.', 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=400&fit=crop')
ON CONFLICT DO NOTHING;
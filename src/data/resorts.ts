// @ts-nocheck
export interface Resort {
  id: string
  slug: string
  name: string
  region: string
  country: string
  flag: string
  altitudeTop: number
  altitudeBase: number
  slopesKm: number
  lifts: number
  runsTotal: number
  difficulty: { green: number; blue: number; red: number; black: number }
  desc: string
  longDesc: string
  priceLevel: number
  imageUrl: string
  galleryUrls: string[]
  highlights: string[]
  bestFor: string[]
  snowReliability: number
  season: string
  continent: string
}

export const RESORTS: Resort[] = [
  {
    id: '1', slug: 'courchevel', name: 'Courchevel', region: 'Les 3 Vallées',
    country: 'Francia', flag: '🇫🇷', continent: 'Europa',
    altitudeTop: 2738, altitudeBase: 1300, slopesKm: 600, lifts: 180, runsTotal: 150,
    difficulty: { green: 27, blue: 40, red: 23, black: 10 },
    desc: 'El epítome del lujo alpino en el dominio esquiable más grande del mundo.',
    longDesc: 'Courchevel es sinónimo de lujo en los Alpes franceses. Situado en el corazón de Les 3 Vallées, el dominio esquiable más grande del mundo con más de 600 km de pistas interconectadas. Boutiques de alta costura, restaurantes con estrella Michelin y remontes ultramodernos hacen de este resort un destino único.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1607868894064-2b6e7ed1b324?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['600km de pistas', 'Gastronomía Michelin', 'Heliesquí', '5 pueblos conectados'],
    bestFor: ['Lujo', 'Gastronomía', 'Familias VIP'],
    snowReliability: 85, season: 'Dic — Abr'
  },
  {
    id: '2', slug: 'zermatt', name: 'Zermatt', region: 'Valais',
    country: 'Suiza', flag: '🇨🇭', continent: 'Europa',
    altitudeTop: 3883, altitudeBase: 1620, slopesKm: 360, lifts: 52, runsTotal: 145,
    difficulty: { green: 15, blue: 35, red: 35, black: 15 },
    desc: 'Esquí icónico a la sombra del Matterhorn con nieve garantizada todo el año.',
    longDesc: 'Zermatt es la joya del esquí suizo, dominada por la majestuosa silueta del Matterhorn. Este pueblo libre de coches ofrece encanto alpino auténtico y es una de las pocas estaciones que permite esquiar 365 días al año gracias a su glaciar permanente a 3.883m.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517737537584-1dc8b2f7e0d3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Esquí 365 días', 'Vista al Matterhorn', 'Pueblo sin coches', 'Glaciar 3883m'],
    bestFor: ['Parejas', 'Fotografía', 'Alpinismo'],
    snowReliability: 95, season: 'Todo el año'
  },
  {
    id: '3', slug: 'val-disere', name: "Val d'Isère", region: 'Espace Killy',
    country: 'Francia', flag: '🇫🇷', continent: 'Europa',
    altitudeTop: 3456, altitudeBase: 1850, slopesKm: 300, lifts: 79, runsTotal: 132,
    difficulty: { green: 15, blue: 30, red: 35, black: 20 },
    desc: 'Paraíso del esquí técnico y cuna de campeones olímpicos.',
    longDesc: "Val d'Isère es sinónimo de esquí técnico de alto nivel. Sede habitual de la Copa del Mundo de Esquí Alpino y escenario de los Juegos Olímpicos de Albertville 1992. Su terreno desafiante atrae a esquiadores avanzados de todo el mundo, mientras que el après-ski del pueblo es legendario.",
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Sede Copa del Mundo', 'Off-piste legendario', 'Après-ski épico', 'Glaciar Pisaillas'],
    bestFor: ['Expertos', 'Freeride', 'Après-ski'],
    snowReliability: 90, season: 'Nov — May'
  },
  {
    id: '4', slug: 'st-moritz', name: 'St. Moritz', region: 'Engadina',
    country: 'Suiza', flag: '🇨🇭', continent: 'Europa',
    altitudeTop: 3303, altitudeBase: 1775, slopesKm: 350, lifts: 56, runsTotal: 88,
    difficulty: { green: 20, blue: 35, red: 30, black: 15 },
    desc: 'Cuna del turismo de invierno. Glamour y Alpes suizos en estado puro.',
    longDesc: 'St. Moritz es donde nació el turismo de invierno moderno en 1864. Hoy sigue siendo sinónimo de elegancia alpina con 300 días de sol al año. Sede de dos Juegos Olímpicos de Invierno (1928 y 1948), combina deporte, arte y gastronomía de primer nivel.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1467280428823-d21e22c5c98c?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['300 días de sol', 'Polo en hielo', '2x Sede Olímpica', 'Cresta Run'],
    bestFor: ['Lujo', 'Sol y nieve', 'Cultura'],
    snowReliability: 80, season: 'Dic — Abr'
  },
  {
    id: '5', slug: 'aspen', name: 'Aspen Snowmass', region: 'Colorado',
    country: 'EE.UU.', flag: '🇺🇸', continent: 'América',
    altitudeTop: 3813, altitudeBase: 2422, slopesKm: 480, lifts: 42, runsTotal: 336,
    difficulty: { green: 10, blue: 35, red: 30, black: 25 },
    desc: 'Cuatro montañas legendarias. Champagne powder y cultura de clase mundial.',
    longDesc: 'Aspen no es solo una estación de esquí, es un estilo de vida. Cuatro montañas interconectadas ofrecen la famosa nieve champagne powder de Colorado: ligera, seca y abundante. Una escena cultural de primer nivel y una vida nocturna incomparable completan la experiencia.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367b2a57a20?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547014762-3a94fb4df70a?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['4 montañas en 1', 'Champagne powder', 'X Games sede', 'Arte y cultura'],
    bestFor: ['Lujo americano', 'Cultura', 'Freeride'],
    snowReliability: 88, season: 'Nov — Abr'
  },
  {
    id: '6', slug: 'niseko', name: 'Niseko United', region: 'Hokkaido',
    country: 'Japón', flag: '🇯🇵', continent: 'Asia',
    altitudeTop: 1308, altitudeBase: 200, slopesKm: 50, lifts: 30, runsTotal: 61,
    difficulty: { green: 30, blue: 35, red: 25, black: 10 },
    desc: 'La nieve polvo más ligera del planeta combinada con cultura japonesa auténtica.',
    longDesc: 'Niseko recibe más de 14 metros de nieve al año — la legendaria "Japow", considerada la nieve más ligera y seca del mundo. Combina esquí extraordinario con onsens naturales, gastronomía japonesa de primer nivel y una hospitalidad única que transforma el viaje en una experiencia cultural completa.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540404783928-81aaed4c5aa9?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['14m de nieve/año', 'Esquí nocturno', 'Onsens naturales', 'Cultura japonesa'],
    bestFor: ['Powder', 'Cultura', 'Aventura'],
    snowReliability: 98, season: 'Dic — Mar'
  },
  {
    id: '7', slug: 'whistler', name: 'Whistler Blackcomb', region: 'British Columbia',
    country: 'Canadá', flag: '🇨🇦', continent: 'América',
    altitudeTop: 2284, altitudeBase: 675, slopesKm: 200, lifts: 37, runsTotal: 200,
    difficulty: { green: 20, blue: 55, red: 0, black: 25 },
    desc: 'El resort más grande de Norteamérica. Dos montañas épicas conectadas por el Peak 2 Peak.',
    longDesc: 'Whistler Blackcomb es el resort de esquí más grande de Norteamérica, con dos montañas épicas unidas por el icónico gondola Peak 2 Peak. Sede de los Juegos Olímpicos de Invierno 2010, ofrece 200 pistas marcadas y un inmenso terreno off-piste en el corazón de las Montañas Costeras de BC.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1521804906557-b5f14a8a0351?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565992441121-4367b2a57a20?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Peak 2 Peak Gondola', 'Sede Olímpica 2010', '3300 ha esquiables', 'Whistler Village'],
    bestFor: ['Grupos', 'Familias', 'Intermediate'],
    snowReliability: 82, season: 'Nov — May'
  },
  {
    id: '8', slug: 'chamonix', name: 'Chamonix Mont-Blanc', region: 'Alta Saboya',
    country: 'Francia', flag: '🇫🇷', continent: 'Europa',
    altitudeTop: 3842, altitudeBase: 1035, slopesKm: 170, lifts: 49, runsTotal: 80,
    difficulty: { green: 10, blue: 25, red: 40, black: 25 },
    desc: 'La capital mundial del alpinismo. Terreno extremo y la mítica Vallée Blanche.',
    longDesc: 'Chamonix es la meca del esquí extremo y el alpinismo mundial. A los pies del Mont Blanc — el techo de Europa a 4.808m — ofrece el descenso off-piste más famoso del mundo: la Vallée Blanche, un glaciar de 20km. Solo para esquiadores avanzados que buscan la adrenalina máxima.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Vallée Blanche 20km', 'Mont Blanc 4808m', 'Off-piste extremo', 'Primer resort del mundo'],
    bestFor: ['Expertos', 'Alpinismo', 'Freeride'],
    snowReliability: 75, season: 'Dic — Abr'
  },
  {
    id: '9', slug: 'st-anton', name: 'St. Anton am Arlberg', region: 'Tirol',
    country: 'Austria', flag: '🇦🇹', continent: 'Europa',
    altitudeTop: 2811, altitudeBase: 1304, slopesKm: 305, lifts: 88, runsTotal: 200,
    difficulty: { green: 15, blue: 35, red: 30, black: 20 },
    desc: 'La cuna del esquí alpino moderno. Off-piste brutal y après-ski legendario.',
    longDesc: 'St. Anton es donde nació el esquí alpino moderno. El mítico Arlberg, compartido entre Austria y Vorarlberg, ofrece 305km de pistas y un inmenso terreno off-piste con algunas de las bajadas más desafiantes de los Alpes. El après-ski en el Mooserwirt es una institución mundial.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1547014762-3a94fb4df70a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1467280428823-d21e22c5c98c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Cuna del esquí alpino', 'Off-piste brutal', 'Après-ski MooserWirt', '305km Arlberg'],
    bestFor: ['Expertos', 'Après-ski', 'Historia del esquí'],
    snowReliability: 83, season: 'Dic — Abr'
  },
  {
    id: '10', slug: 'val-gardena', name: 'Val Gardena', region: 'Dolomitas',
    country: 'Italia', flag: '🇮🇹', continent: 'Europa',
    altitudeTop: 2518, altitudeBase: 1236, slopesKm: 175, lifts: 83, runsTotal: 175,
    difficulty: { green: 30, blue: 40, red: 20, black: 10 },
    desc: 'Las montañas más bellas del mundo. Dolomitas UNESCO y la Sella Ronda.',
    longDesc: 'Val Gardena es el corazón de los Dolomitas, declarados Patrimonio de la Humanidad por la UNESCO. El famoso circuito Sella Ronda conecta cuatro valles con 40km de pistas perfectamente preparadas. La gastronomía local — entre las mejores de los Alpes — y la arquitectura Ladin hacen único este destino.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1549166417-431839178221?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Dolomitas UNESCO', 'Sella Ronda 40km', 'Gastronomía alpina', 'Paisajes únicos'],
    bestFor: ['Familias', 'Fotografía', 'Gastronomía'],
    snowReliability: 78, season: 'Dic — Mar'
  },
  {
    id: '11', slug: 'portillo', name: 'Portillo', region: 'Andes',
    country: 'Chile', flag: '🇨🇱', continent: 'América',
    altitudeTop: 3310, altitudeBase: 2590, slopesKm: 35, lifts: 14, runsTotal: 35,
    difficulty: { green: 15, blue: 35, red: 35, black: 15 },
    desc: 'El resort más icónico de Sudamérica. All-inclusive único junto a la Laguna del Inca.',
    longDesc: 'Portillo es el resort de esquí más icónico de Sudamérica, único en su modelo all-inclusive con solo 450 huéspedes. Situado a 2.850m en los Andes chilenos, junto a la mágica Laguna del Inca de color turquesa, ofrece una experiencia íntima y exclusiva que ningún otro resort del mundo puede igualar.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1502675135487-e971002a6adb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565992441121-4367b2a57a20?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521804906557-b5f14a8a0351?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['All-inclusive único', 'Solo 450 huéspedes', 'Laguna del Inca', 'Temporada de verano'],
    bestFor: ['Parejas', 'Exclusividad', 'Temporada inversa'],
    snowReliability: 80, season: 'Jun — Oct'
  },
  {
    id: '12', slug: 'verbier', name: 'Verbier', region: '4 Vallées',
    country: 'Suiza', flag: '🇨🇭', continent: 'Europa',
    altitudeTop: 3330, altitudeBase: 1500, slopesKm: 412, lifts: 89, runsTotal: 200,
    difficulty: { green: 10, blue: 30, red: 40, black: 20 },
    desc: 'El playground favorito de la élite mundial. Freeride extremo en los 4 Vallées.',
    longDesc: 'Verbier es el resort favorito de las estrellas del rock, la realeza y los mejores esquiadores del mundo. Parte del dominio 4 Vallées con 412km de pistas, es famoso por su terreno off-piste y por albergar el Xtreme Verbier — la competición de freeride más extrema del planeta.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&q=80&w=1400',
    galleryUrls: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540404783928-81aaed4c5aa9?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['412km 4 Vallées', 'Xtreme Verbier', 'Off-piste extremo', 'Nightlife top mundial'],
    bestFor: ['Expertos', 'Freeride', 'Lujo extremo'],
    snowReliability: 87, season: 'Dic — Abr'
  },
]

export const CONTINENTS = ['Todos', 'Europa', 'América', 'Asia']
export const COUNTRIES = ['Todos', 'Francia', 'Suiza', 'Austria', 'Italia', 'EE.UU.', 'Canadá', 'Japón', 'Chile']
export const DIFFICULTY_LEVELS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado', 'Experto']
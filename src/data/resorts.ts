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
  highlights: string[]
  bestFor: string[]
  snowReliability: number
  season: string
}

export const RESORTS: Resort[] = [
  {
    id: '1', slug: 'courchevel', name: 'Courchevel', region: 'Les 3 Vallées',
    country: 'Francia', flag: '🇫🇷', altitudeTop: 2738, altitudeBase: 1300,
    slopesKm: 600, lifts: 180, runsTotal: 150,
    difficulty: { green: 27, blue: 40, red: 23, black: 10 },
    desc: 'El epítome del lujo alpino en el dominio esquiable más grande del mundo.',
    longDesc: 'Courchevel es sinónimo de lujo en los Alpes franceses. Situado en el corazón de Les 3 Vallées, el dominio esquiable más grande del mundo con más de 600 km de pistas. Boutiques de alta costura, restaurantes Michelin y remontes ultramodernos.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1544454673-890334812848?auto=format&fit=crop&q=80&w=1200',
    highlights: ['600km de pistas', 'Gastronomía Michelin', 'Heliesquí', '5 pueblos conectados'],
    bestFor: ['Lujo', 'Gastronomía', 'Familias VIP'], snowReliability: 85, season: 'Dic — Abr'
  },
  {
    id: '2', slug: 'zermatt', name: 'Zermatt', region: 'Valais',
    country: 'Suiza', flag: '🇨🇭', altitudeTop: 3883, altitudeBase: 1620,
    slopesKm: 360, lifts: 52, runsTotal: 145,
    difficulty: { green: 15, blue: 35, red: 35, black: 15 },
    desc: 'Esquí icónico a la sombra del Matterhorn con nieve garantizada todo el año.',
    longDesc: 'Zermatt es la joya del esquí suizo. Dominado por la majestuosa silueta del Matterhorn, este pueblo libre de coches ofrece encanto alpino auténtico. Una de las pocas estaciones que permite esquiar 365 días al año gracias a su glaciar.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
    highlights: ['Esquí 365 días', 'Vista al Matterhorn', 'Pueblo sin coches', 'Glaciar 3883m'],
    bestFor: ['Parejas', 'Fotografía', 'Alpinismo'], snowReliability: 95, season: 'Todo el año'
  },
  {
    id: '3', slug: 'val-disere', name: "Val d'Isère", region: 'Espace Killy',
    country: 'Francia', flag: '🇫🇷', altitudeTop: 3456, altitudeBase: 1850,
    slopesKm: 300, lifts: 79, runsTotal: 132,
    difficulty: { green: 15, blue: 30, red: 35, black: 20 },
    desc: 'Paraíso del esquí técnico y cuna de campeones olímpicos.',
    longDesc: "Val d'Isère es sinónimo de esquí técnico de alto nivel. Sede habitual de la Copa del Mundo de Esquí Alpino y escenario de los Juegos Olímpicos de 1992. Terreno desafiante para expertos con après-ski legendario.",
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=1200',
    highlights: ['Sede Copa del Mundo', 'Off-piste legendario', 'Après-ski épico', 'Glaciar Pisaillas'],
    bestFor: ['Expertos', 'Freeride', 'Après-ski'], snowReliability: 90, season: 'Nov — May'
  },
  {
    id: '4', slug: 'st-moritz', name: 'St. Moritz', region: 'Engadina',
    country: 'Suiza', flag: '🇨🇭', altitudeTop: 3303, altitudeBase: 1775,
    slopesKm: 350, lifts: 56, runsTotal: 88,
    difficulty: { green: 20, blue: 35, red: 30, black: 15 },
    desc: 'Cuna del turismo de invierno. Glamour y Alpes en estado puro.',
    longDesc: 'St. Moritz es donde todo comenzó. En 1864 nació aquí el turismo de invierno moderno. Hoy sigue siendo sinónimo de elegancia alpina con 300 días de sol al año. Sede de dos Juegos Olímpicos de Invierno.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=1200',
    highlights: ['300 días de sol', 'Polo en hielo', '2x Sede Olímpica', 'Cresta Run'],
    bestFor: ['Lujo', 'Sol y nieve', 'Cultura'], snowReliability: 80, season: 'Dic — Abr'
  },
  {
    id: '5', slug: 'aspen', name: 'Aspen Snowmass', region: 'Colorado',
    country: 'EE.UU.', flag: '🇺🇸', altitudeTop: 3813, altitudeBase: 2422,
    slopesKm: 480, lifts: 42, runsTotal: 336,
    difficulty: { green: 10, blue: 35, red: 30, black: 25 },
    desc: 'Cuatro montañas legendarias. Champagne powder y cultura de clase mundial.',
    longDesc: 'Aspen no es solo una estación de esquí, es un estilo de vida. Cuatro montañas interconectadas con la nieve champagne powder de Colorado: ligera, seca y abundante. Escena cultural top y vida nocturna incomparable.',
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=1200',
    highlights: ['4 montañas en 1', 'Champagne powder', 'X Games sede', 'Arte y cultura'],
    bestFor: ['Lujo americano', 'Cultura', 'Freeride'], snowReliability: 88, season: 'Nov — Abr'
  },
  {
    id: '6', slug: 'niseko', name: 'Niseko United', region: 'Hokkaido',
    country: 'Japón', flag: '🇯🇵', altitudeTop: 1308, altitudeBase: 200,
    slopesKm: 50, lifts: 30, runsTotal: 61,
    difficulty: { green: 30, blue: 35, red: 25, black: 10 },
    desc: 'La nieve polvo más ligera del planeta y cultura japonesa auténtica.',
    longDesc: 'Niseko recibe más de 14 metros de nieve al año — la legendaria "Japow", considerada la más ligera y seca del mundo. Combina esquí increíble con onsens naturales, sushi fresco y hospitalidad japonesa incomparable.',
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=1200',
    highlights: ['14m de nieve/año', 'Esquí nocturno', 'Onsens naturales', 'Cultura japonesa'],
    bestFor: ['Powder', 'Cultura', 'Aventura'], snowReliability: 98, season: 'Dic — Abr'
  }
]
// src/lib/i18n.ts
export type Lang = 'es' | 'en';

// Navigation translations
const navTranslations: Record<string, Record<Lang, string>> = {
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.wizard': { es: 'Planifica tu Viaje', en: 'Plan Trip' },
  'nav.resorts': { es: 'Centros de Esquí', en: 'Resorts' },
  'nav.dash': { es: 'Mis Viajes', en: 'My Trips' },
  'nav.login': { es: 'Iniciar Sesión', en: 'Sign In' },
  'nav.signup': { es: 'Registrarse', en: 'Sign Up' },
  'nav.logout': { es: 'Salir', en: 'Sign Out' },
};

// Hero section translations
const heroTranslations: Record<string, Record<Lang, string>> = {
  'hero.t1': { es: 'Tu Aventura en la Nieve', en: 'Your Snow Adventure' },
  'hero.t2': { es: 'Comienza Aquí', en: 'Starts Here' },
  'hero.sub': { es: 'Planifica el viaje de esquí perfecto con IA. Vuelos, hoteles, pases y equipos — todo en un solo lugar.', en: 'Plan the perfect ski trip with AI. Flights, hotels, passes and gear — all in one place.' },
  'hero.cta': { es: 'Comenzar Planificación', en: 'Start Planning' },
  'hero.explore': { es: 'Explorar Centros', en: 'Explore Resorts' },
};

// Features section translations
const featuresTranslations: Record<string, Record<Lang, string>> = {
  'why.title': { es: '¿Por qué HolaSki?', en: 'Why HolaSki?' },
  'why.ai': { es: 'IA Inteligente', en: 'Smart AI' },
  'why.aiD': { es: 'Paquetes personalizados según tu experiencia y presupuesto.', en: 'Packages personalized to your experience and budget.' },
  'why.all': { es: 'Todo en Uno', en: 'All in One' },
  'why.allD': { es: 'Vuelos, hoteles, pases, equipos y traslados en una reserva.', en: 'Flights, hotels, passes, gear and transfers in one booking.' },
  'why.grp': { es: 'Viajes en Grupo', en: 'Group Trips' },
  'why.grpD': { es: 'Planifica con amigos y familia. Vota destinos y divide costos.', en: 'Plan with friends and family. Vote and split costs.' },
  'why.price': { es: 'Precios Transparentes', en: 'Transparent Pricing' },
  'why.priceD': { es: 'Sin costos ocultos. Desglose completo antes de reservar.', en: 'No hidden costs. Full breakdown before booking.' },
  'feat.title': { es: 'Centros Destacados', en: 'Featured Resorts' },
  'feat.sub': { es: 'Los mejores destinos de esquí del mundo', en: 'The best ski destinations worldwide' },
};

// Wizard translations
const wizardTranslations: Record<string, Record<Lang, string>> = {
  'wiz.title': { es: 'Planifica tu Viaje de Esquí', en: 'Plan Your Ski Trip' },
  'wiz.sub': { es: 'Nuestra IA creará el paquete perfecto para ti', en: 'Our AI will create the perfect package for you' },
  'wiz.s1': { es: 'Experiencia', en: 'Experience' },
  'wiz.s2': { es: 'Grupo', en: 'Group' },
  'wiz.s3': { es: 'Presupuesto', en: 'Budget' },
  'wiz.s4': { es: 'Destino', en: 'Destination' },
  'wiz.s5': { es: 'Resultados', en: 'Results' },
  'wiz.next': { es: 'Siguiente', en: 'Next' },
  'wiz.back': { es: 'Atrás', en: 'Back' },
  'wiz.gen': { es: 'Generar Paquetes con IA', en: 'Generate AI Packages' },
  'wiz.loading': { es: 'Nuestra IA está creando tu paquete...', en: 'Our AI is creating your package...' },
  'wiz.expQ': { es: '¿Cuál es tu nivel de esquí?', en: 'What is your skiing level?' },
  'wiz.beg': { es: 'Principiante', en: 'Beginner' },
  'wiz.begD': { es: 'Primera vez o pocas experiencias', en: 'First time or few experiences' },
  'wiz.int': { es: 'Intermedio', en: 'Intermediate' },
  'wiz.intD': { es: 'Cómodo en pistas azules y rojas', en: 'Comfortable on blue and red runs' },
  'wiz.adv': { es: 'Avanzado', en: 'Advanced' },
  'wiz.advD': { es: 'Domino pistas rojas y negras', en: 'Red and black runs' },
  'wiz.expert': { es: 'Experto', en: 'Expert' },
  'wiz.expertD': { es: 'Fuera de pista y freeride', en: 'Off-piste and freeride' },
  'wiz.grpQ': { es: '¿Con quién viajas?', en: 'Who are you traveling with?' },
  'wiz.solo': { es: 'Solo', en: 'Solo' },
  'wiz.couple': { es: 'Pareja', en: 'Couple' },
  'wiz.family': { es: 'Familia', en: 'Family' },
  'wiz.friends': { es: 'Amigos', en: 'Friends' },
  'wiz.size': { es: 'Personas', en: 'People' },
  'wiz.budQ': { es: '¿Presupuesto por persona?', en: 'Budget per person?' },
  'wiz.b1': { es: 'Económico', en: 'Budget' },
  'wiz.b2': { es: 'Moderado', en: 'Moderate' },
  'wiz.b3': { es: 'Premium', en: 'Premium' },
  'wiz.b4': { es: 'Lujo', en: 'Luxury' },
  'wiz.regQ': { es: '¿Dónde quieres esquiar?', en: 'Where do you want to ski?' },
  'wiz.depart': { es: 'Ciudad de salida', en: 'Departure city' },
  'wiz.dates': { es: 'Fechas preferidas', en: 'Preferred dates' },
};

// Package/Booking translations
const packageTranslations: Record<string, Record<Lang, string>> = {
  'pkg.pp': { es: 'por persona', en: 'per person' },
  'pkg.flight': { es: 'Vuelo', en: 'Flight' },
  'pkg.hotel': { es: 'Hotel', en: 'Hotel' },
  'pkg.pass': { es: 'Pase de Esquí', en: 'Ski Pass' },
  'pkg.equip': { es: 'Equipamiento', en: 'Equipment' },
  'pkg.transfer': { es: 'Traslados', en: 'Transfers' },
  'pkg.lessons': { es: 'Clases', en: 'Lessons' },
  'pkg.meals': { es: 'Alimentación', en: 'Meals' },
  'pkg.insurance': { es: 'Seguro', en: 'Insurance' },
  'pkg.taxes': { es: 'Impuestos', en: 'Taxes' },
  'pkg.total': { es: 'Total por persona', en: 'Total per person' },
  'pkg.save': { es: 'Guardar', en: 'Save' },
  'pkg.book': { es: 'Reservar', en: 'Book' },
  'pkg.best': { es: 'Mejor Valor', en: 'Best Value' },
  'pkg.prem': { es: 'Premium', en: 'Premium' },
  'pkg.nights': { es: 'noches', en: 'nights' },
  'pkg.days': { es: 'días', en: 'days' },
  'pkg.direct': { es: 'Directo', en: 'Direct' },
  'pkg.stops': { es: 'escalas', en: 'stops' },
};

// Resorts page translations
const resortsTranslations: Record<string, Record<Lang, string>> = {
  'resorts.title': { es: 'Centros de Esquí', en: 'Ski Resorts' },
  'resorts.sub': { es: 'Descubre los mejores destinos', en: 'Discover the best destinations' },
  'resorts.all': { es: 'Todos', en: 'All' },
  'resorts.runs': { es: 'pistas', en: 'runs' },
  'resorts.lifts': { es: 'andariveles', en: 'lifts' },
  'resorts.season': { es: 'Temporada', en: 'Season' },
  'resorts.from': { es: 'Desde', en: 'From' },
  'resorts.plan': { es: 'Planificar', en: 'Plan Trip' },
};

// Dashboard translations
const dashboardTranslations: Record<string, Record<Lang, string>> = {
  'dash.title': { es: 'Mis Viajes', en: 'My Trips' },
  'dash.none': { es: 'No tienes viajes guardados', en: 'No saved trips' },
  'dash.start': { es: 'Planifica tu primera aventura', en: 'Plan your first adventure' },
};

// Authentication translations
const authTranslations: Record<string, Record<Lang, string>> = {
  'auth.login': { es: 'Iniciar Sesión', en: 'Sign In' },
  'auth.signup': { es: 'Crear Cuenta', en: 'Create Account' },
  'auth.email': { es: 'Correo electrónico', en: 'Email' },
  'auth.pass': { es: 'Contraseña', en: 'Password' },
  'auth.name': { es: 'Nombre completo', en: 'Full name' },
};

// Footer translations
const footerTranslations: Record<string, Record<Lang, string>> = {
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.privacy': { es: 'Privacidad', en: 'Privacy' },
  'footer.terms': { es: 'Términos', en: 'Terms' },
};

// Combine all translations
const d: Record<string, Record<Lang, string>> = {
  ...navTranslations,
  ...heroTranslations,
  ...featuresTranslations,
  ...wizardTranslations,
  ...packageTranslations,
  ...resortsTranslations,
  ...dashboardTranslations,
  ...authTranslations,
  ...footerTranslations,
};

export function t(key: string, lang: Lang): string { return d[key]?.[lang] || key; }
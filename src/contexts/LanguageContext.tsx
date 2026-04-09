// src/contexts/LanguageContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language } from '../types';

const translations: Record<string, Record<Language, string>> = {
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.wizard': { es: 'Planifica tu Viaje', en: 'Plan Your Trip' },
  'nav.resorts': { es: 'Centros de Esquí', en: 'Ski Resorts' },
  'nav.dashboard': { es: 'Mis Viajes', en: 'My Trips' },
  'nav.login': { es: 'Iniciar Sesión', en: 'Sign In' },
  'nav.signup': { es: 'Registrarse', en: 'Sign Up' },
  'nav.logout': { es: 'Cerrar Sesión', en: 'Sign Out' },
  'hero.title': { es: 'Tu Aventura en la Nieve', en: 'Your Snow Adventure' },
  'hero.titleAccent': { es: 'Comienza Aquí', en: 'Starts Here' },
  'hero.subtitle': { es: 'Planifica el viaje de esquí perfecto con inteligencia artificial. Vuelos, hoteles, pases y equipos — todo en un solo lugar.', en: 'Plan the perfect ski trip with artificial intelligence. Flights, hotels, passes and gear — all in one place.' },
  'hero.cta': { es: 'Comenzar Planificación', en: 'Start Planning' },
  'hero.explore': { es: 'Explorar Centros', en: 'Explore Resorts' },
  'featured.title': { es: 'Centros Destacados', en: 'Featured Resorts' },
  'featured.subtitle': { es: 'Los mejores destinos de esquí del mundo, seleccionados para ti', en: 'The best ski destinations in the world, selected for you' },
  'features.title': { es: '¿Por qué HolaSki?', en: 'Why HolaSki?' },
  'features.ai': { es: 'IA Inteligente', en: 'Smart AI' },
  'features.aiDesc': { es: 'Nuestro asistente de IA crea paquetes personalizados según tu experiencia, presupuesto y preferencias.', en: 'Our AI assistant creates personalized packages based on your experience, budget and preferences.' },
  'features.allinone': { es: 'Todo en Uno', en: 'All in One' },
  'features.allinoneDesc': { es: 'Vuelos, hoteles, pases de esquí, arriendo de equipos y traslados en una sola reserva.', en: 'Flights, hotels, ski passes, gear rentals and transfers in a single booking.' },
  'features.group': { es: 'Viajes en Grupo', en: 'Group Trips' },
  'features.groupDesc': { es: 'Planifica con amigos y familia. Vota destinos, divide costos y comparte itinerarios.', en: 'Plan with friends and family. Vote destinations, split costs and share itineraries.' },
  'features.transparent': { es: 'Precios Transparentes', en: 'Transparent Pricing' },
  'features.transparentDesc': { es: 'Sin costos ocultos. Ve el desglose completo de tu viaje antes de reservar.', en: 'No hidden costs. See the full breakdown of your trip before booking.' },
  'wizard.title': { es: 'Planifica tu Viaje de Esquí', en: 'Plan Your Ski Trip' },
  'wizard.subtitle': { es: 'Responde algunas preguntas y nuestra IA creará el paquete perfecto para ti', en: 'Answer a few questions and our AI will create the perfect package for you' },
  'wizard.step1': { es: 'Experiencia', en: 'Experience' },
  'wizard.step2': { es: 'Grupo', en: 'Group' },
  'wizard.step3': { es: 'Presupuesto', en: 'Budget' },
  'wizard.step4': { es: 'Destino', en: 'Destination' },
  'wizard.step5': { es: 'Resultados', en: 'Results' },
  'wizard.next': { es: 'Siguiente', en: 'Next' },
  'wizard.back': { es: 'Atrás', en: 'Back' },
  'wizard.generate': { es: 'Generar Paquetes con IA', en: 'Generate AI Packages' },
  'wizard.generating': { es: 'Nuestra IA está creando tu paquete perfecto...', en: 'Our AI is creating your perfect package...' },
  'wizard.expQuestion': { es: '¿Cuál es tu nivel de esquí?', en: 'What is your skiing level?' },
  'wizard.beginner': { es: 'Principiante', en: 'Beginner' },
  'wizard.beginnerDesc': { es: 'Primera vez o pocas experiencias en la nieve', en: 'First time or few snow experiences' },
  'wizard.intermediate': { es: 'Intermedio', en: 'Intermediate' },
  'wizard.intermediateDesc': { es: 'Cómodo en pistas azules y algunas rojas', en: 'Comfortable on blue and some red runs' },
  'wizard.advanced': { es: 'Avanzado', en: 'Advanced' },
  'wizard.advancedDesc': { es: 'Domino pistas rojas y negras', en: 'I handle red and black runs' },
  'wizard.expert': { es: 'Experto', en: 'Expert' },
  'wizard.expertDesc': { es: 'Fuera de pista, freeride y terreno extremo', en: 'Off-piste, freeride and extreme terrain' },
  'wizard.groupQuestion': { es: '¿Con quién viajas?', en: 'Who are you traveling with?' },
  'wizard.solo': { es: 'Solo', en: 'Solo' },
  'wizard.couple': { es: 'Pareja', en: 'Couple' },
  'wizard.family': { es: 'Familia', en: 'Family' },
  'wizard.friends': { es: 'Amigos', en: 'Friends' },
  'wizard.groupSize': { es: 'Cantidad de personas', en: 'Number of people' },
  'wizard.budgetQuestion': { es: '¿Cuál es tu presupuesto por persona?', en: 'What is your budget per person?' },
  'wizard.budgetEcon': { es: 'Económico', en: 'Budget' },
  'wizard.budgetMid': { es: 'Moderado', en: 'Moderate' },
  'wizard.budgetPrem': { es: 'Premium', en: 'Premium' },
  'wizard.budgetLux': { es: 'Lujo', en: 'Luxury' },
  'wizard.regionQuestion': { es: '¿Dónde quieres esquiar?', en: 'Where do you want to ski?' },
  'wizard.departure': { es: 'Ciudad de salida', en: 'Departure city' },
  'wizard.dates': { es: 'Fechas preferidas', en: 'Preferred dates' },
  'results.title': { es: 'Tus Paquetes Personalizados', en: 'Your Personalized Packages' },
  'results.perPerson': { es: 'por persona', en: 'per person' },
  'results.flight': { es: 'Vuelo', en: 'Flight' },
  'results.hotel': { es: 'Hotel', en: 'Hotel' },
  'results.skiPass': { es: 'Pase de Esquí', en: 'Ski Pass' },
  'results.equipment': { es: 'Equipamiento', en: 'Equipment' },
  'results.transfers': { es: 'Traslados', en: 'Transfers' },
  'results.lessons': { es: 'Clases', en: 'Lessons' },
  'results.meals': { es: 'Alimentación (est.)', en: 'Meals (est.)' },
  'results.insurance': { es: 'Seguro', en: 'Insurance' },
  'results.taxes': { es: 'Impuestos y tasas', en: 'Taxes & fees' },
  'results.total': { es: 'Total por persona', en: 'Total per person' },
  'results.save': { es: 'Guardar Paquete', en: 'Save Package' },
  'results.book': { es: 'Reservar Ahora', en: 'Book Now' },
  'results.share': { es: 'Compartir', en: 'Share' },
  'results.bestValue': { es: 'Mejor Valor', en: 'Best Value' },
  'results.premium': { es: 'Premium', en: 'Premium' },
  'results.nights': { es: 'noches', en: 'nights' },
  'results.days': { es: 'días', en: 'days' },
  'results.stops': { es: 'escalas', en: 'stops' },
  'results.direct': { es: 'Directo', en: 'Direct' },
  'results.included': { es: 'Incluido', en: 'Included' },
  'resorts.title': { es: 'Centros de Esquí', en: 'Ski Resorts' },
  'resorts.subtitle': { es: 'Descubre los mejores destinos de esquí del mundo', en: 'Discover the best ski destinations in the world' },
  'resorts.all': { es: 'Todos', en: 'All' },
  'resorts.runs': { es: 'pistas', en: 'runs' },
  'resorts.lifts': { es: 'andariveles', en: 'lifts' },
  'resorts.season': { es: 'Temporada', en: 'Season' },
  'resorts.from': { es: 'Desde', en: 'From' },
  'resorts.perDay': { es: '/día', en: '/day' },
  'resorts.viewDetail': { es: 'Ver Detalle', en: 'View Detail' },
  'resorts.planTrip': { es: 'Planificar Viaje', en: 'Plan Trip' },
  'dashboard.title': { es: 'Mis Viajes', en: 'My Trips' },
  'dashboard.noTrips': { es: 'Aún no tienes viajes guardados', en: 'You have no saved trips yet' },
  'dashboard.startPlanning': { es: 'Comienza a planificar tu próxima aventura', en: 'Start planning your next adventure' },
  'dashboard.saved': { es: 'Guardados', en: 'Saved' },
  'dashboard.groups': { es: 'Grupos', en: 'Groups' },
  'group.title': { es: 'Planificación Grupal', en: 'Group Planning' },
  'group.members': { es: 'Miembros', en: 'Members' },
  'group.voting': { es: 'Votación', en: 'Voting' },
  'group.costs': { es: 'División de Costos', en: 'Cost Split' },
  'group.invite': { es: 'Invitar Miembro', en: 'Invite Member' },
  'group.owner': { es: 'Organizador', en: 'Organizer' },
  'group.member': { es: 'Miembro', en: 'Member' },
  'group.pending': { es: 'Pendiente', en: 'Pending' },
  'group.accepted': { es: 'Aceptado', en: 'Accepted' },
  'group.vote': { es: 'Votar', en: 'Vote' },
  'group.voted': { es: 'Votado', en: 'Voted' },
  'group.paid': { es: 'Pagado', en: 'Paid' },
  'group.unpaid': { es: 'Pendiente', en: 'Unpaid' },
  'auth.login': { es: 'Iniciar Sesión', en: 'Sign In' },
  'auth.signup': { es: 'Crear Cuenta', en: 'Create Account' },
  'auth.email': { es: 'Correo electrónico', en: 'Email' },
  'auth.password': { es: 'Contraseña', en: 'Password' },
  'auth.name': { es: 'Nombre completo', en: 'Full name' },
  'auth.loginRequired': { es: 'Necesitas iniciar sesión para acceder a esta función', en: 'You need to sign in to access this feature' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.about': { es: 'Sobre Nosotros', en: 'About Us' },
  'footer.privacy': { es: 'Privacidad', en: 'Privacy' },
  'footer.terms': { es: 'Términos', en: 'Terms' },
  'footer.unsubscribe': { es: 'Cancelar suscripción', en: 'Unsubscribe' },
  'common.loading': { es: 'Cargando...', en: 'Loading...' },
  'common.error': { es: 'Ocurrió un error', en: 'An error occurred' },
  'common.retry': { es: 'Reintentar', en: 'Retry' },
  'common.currency': { es: 'Moneda', en: 'Currency' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
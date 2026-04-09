// @ts-nocheck
import { TripPackage } from '../types';

export const packages: TripPackage[] = [
  {
    id: 'p1', slug: 'clasico-alpes-franceses', name: 'Clásico Alpes Franceses',
    tagline: '7 días en el corazón de Les 3 Vallées',
    description: 'Un paquete completo para descubrir Val Thorens y Courchevel con guía de habla hispana.',
    duration: 7, resorts: ['Val Thorens', 'Courchevel'], priceFrom: 2450,
    includes: ['Vuelos', 'Traslados', 'Ski Pass 6 días', 'Hotel 4*', 'Desayunos'],
    highlights: ['Guía en español', 'Hotel a pie de pista', 'Cena de bienvenida'],
    difficulty: 'all-levels', bestFor: ['Parejas', 'Amigos'], season: 'Enero - Marzo',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80'
  },
  {
    id: 'p2', slug: 'aventura-colorado', name: 'Aventura en Colorado',
    tagline: 'Explora Vail y Aspen en un solo viaje',
    description: 'Lo mejor del esquí estadounidense en los resorts más icónicos de Colorado.',
    duration: 10, resorts: ['Vail', 'Aspen'], priceFrom: 3800,
    includes: ['Vuelos internos', 'Epic Pass', 'Alojamiento premium', 'Alquiler de equipo'],
    highlights: ['Back Bowls de Vail', 'Après-ski en Aspen', 'Traslados privados'],
    difficulty: 'intermediate', bestFor: ['Esquiadores ávidos', 'Lujo'], season: 'Febrero',
    image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80'
  }
];
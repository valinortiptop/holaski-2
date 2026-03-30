// @ts-nocheck
// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">Tu Aventura en la Nieve <br/><span className="text-blue-500">Comienza Aquí</span></h1>
      <p className="text-xl text-white/70 max-w-2xl mb-10">Planifica el viaje de esquí perfecto con Inteligencia Artificial. Vuelos, hoteles, pases y equipos — todo en un solo lugar.</p>
      <div className="flex gap-4">
        <Link to="/wizard" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg">Asistente IA</Link>
        <Link to="/resorts" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg">Ver Centros</Link>
      </div>
    </div>
  );
}
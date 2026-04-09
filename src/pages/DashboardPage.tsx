// src/pages/DashboardPage.tsx
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function DashboardPage() {
  const { user } = useContext(AppContext);

  if (!user) {
    return <div className="text-center py-20">Por favor inicia sesión para ver tus viajes.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Mis Viajes</h2>
      <div className="bg-slate-900 p-8 rounded-2xl text-center border border-white/10">
        <p className="text-white/60 mb-4">Aún no tienes viajes guardados.</p>
        <a href="/wizard" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Planificar un Viaje</a>
      </div>
    </div>
  );
}
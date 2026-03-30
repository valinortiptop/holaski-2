// @ts-nocheck
// src/pages/ResortsPage.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ResortsPage() {
  const [resorts, setResorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('ski_resorts').select('*').then(({ data }) => {
      setResorts(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Centros de Esquí</h2>
      {loading ? (
        <div className="text-center py-10">Cargando...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {resorts.map(r => (
            <div key={r.id} className="bg-slate-900 rounded-xl overflow-hidden border border-white/10">
              <img src={r.image_url} alt={r.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{r.name}</h3>
                <p className="text-white/50 text-sm mb-2">{r.country}</p>
                <p className="text-white/80">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
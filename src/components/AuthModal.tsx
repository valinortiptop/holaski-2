// src/components/AuthModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../App';
import { toast } from 'sonner';

export default function AuthModal() {
  const { setShowAuth } = useApp();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      const { error: e2 } = await supabase.auth.signUp({ email, password: pass });
      if (e2) toast.error(e2.message); else toast.success('¡Cuenta creada!');
    } else toast.success('¡Bienvenido!');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative shadow-2xl">
        <button onClick={() => setShowAuth(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Acceder / Registro</h2>
        <form onSubmit={handle} className="space-y-4">
          <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
            {loading ? 'Cargando...' : 'Continuar'}
          </button>
        </form>
      </div>
    </div>
  );
}
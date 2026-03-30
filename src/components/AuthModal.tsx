// @ts-nocheck
// src/components/AuthModal.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useApp } from '../App';
import { toast } from 'sonner';

export default function AuthModal() {
  const { setShowAuth } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) toast.error(signUpError.message);
      else toast.success("Cuenta creada!");
    } else {
      toast.success("Bienvenido de vuelta!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-xl max-w-sm w-full border border-white/10">
        <h2 className="text-xl font-bold mb-4">Acceder / Registro</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-800 p-3 rounded-lg outline-none" required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-800 p-3 rounded-lg outline-none" required />
          <div className="flex justify-between gap-2 mt-4">
            <button type="button" onClick={() => setShowAuth(false)} className="px-4 py-2 text-white/50">Cancelar</button>
            <button type="submit" className="bg-blue-600 px-6 py-2 rounded-lg">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
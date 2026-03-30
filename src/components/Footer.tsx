// @ts-nocheck
// src/components/Footer.tsx
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const handleUnsubscribe = async () => {
    const email = prompt("Ingresa tu correo para darte de baja:");
    if (!email) return;
    try {
      await supabase.functions.invoke('api-handler', {
        body: { action: 'unsubscribe', email }
      });
      toast.success("Te has dado de baja exitosamente.");
    } catch (err) {
      toast.error("Hubo un error al procesar tu solicitud.");
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-white/10 py-8 text-center text-sm text-white/50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <p>Tu plataforma todo-en-uno para planificar viajes de esquí desde Latinoamérica.</p>
        <p>Contacto: info@holaski.com | +56 2 2345 6789</p>
        <p>© {new Date().getFullYear()} HolaSki. Todos los derechos reservados.</p>
        <button onClick={handleUnsubscribe} className="text-xs underline hover:text-white">Darse de baja de correos</button>
      </div>
    </footer>
  );
}
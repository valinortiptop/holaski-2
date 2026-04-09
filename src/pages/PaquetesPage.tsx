// @ts-nocheck
export default function PaquetesPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl md:text-7xl font-black text-white mb-8">PAQUETES 2024/25</h1>
      <p className="text-slate-400 text-xl text-center max-w-2xl mb-12">Estamos preparando las mejores ofertas para la próxima temporada. Déjanos tus datos para ser el primero en recibirlas.</p>
      <div className="w-full max-w-md bg-navy-950 p-8 rounded-[2rem] border border-white/5">
        <input type="email" placeholder="Tu email" className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white mb-4" />
        <button className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase tracking-widest">Avisarme</button>
      </div>
    </div>
  )
}
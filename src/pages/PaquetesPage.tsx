export default function PaquetesPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4 text-center">
      <h1 className="text-5xl font-black text-white uppercase mb-8">Paquetes Exclusivos</h1>
      <p className="text-slate-400 max-w-2xl mx-auto mb-12">Estamos preparando nuestras mejores ofertas para la temporada 2024/25.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1,2,3].map(i => (
          <div key={i} className="h-96 bg-navy-950/50 border border-white/5 rounded-[2.5rem] animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
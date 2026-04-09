// @ts-nocheck
export default function PaquetesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl font-black text-white mb-8 uppercase tracking-tighter">PAQUETES EXCLUSIVOS</h1>
        <p className="text-slate-400 text-lg mb-12">Estamos preparando experiencias únicas para la temporada 2024/25.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Aventura Pro', desc: 'Heli-esquí y fuera de pista extremo.' },
            { title: 'Family Lux', desc: 'Escuelas premium y alojamiento pie de pista.' },
            { title: 'Gourmet Ski', desc: 'Safari gastronómico en refugios Michelin.' }
          ].map((pkg, i) => (
            <div key={i} className="bg-navy-950 p-12 rounded-[3rem] border border-white/5">
              <h3 className="text-2xl font-black text-white mb-4 uppercase">{pkg.title}</h3>
              <p className="text-slate-400 mb-8">{pkg.desc}</p>
              <div className="text-blue-500 font-bold uppercase tracking-widest text-sm">Próximamente</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
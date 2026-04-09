import { Plane, Hotel, Ticket, Briefcase, Zap } from 'lucide-react';

export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Valle Nevado VIP",
      resort: "Valle Nevado, Chile",
      duration: "7 Noches",
      price: "$2,850",
      includes: ["Vuelos", "Hotel 5*", "Ski Pass 6 días", "Traslados"],
      image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Aspen Luxury Experience",
      resort: "Aspen Snowmass, USA",
      duration: "10 Noches",
      price: "$5,400",
      includes: ["Vuelos Business", "Lodge Ski-in/out", "Ski Pass", "Clases Pro"],
      image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800",
      tag: "Premium"
    },
    {
      id: 3,
      name: "Niseko Powder Discovery",
      resort: "Niseko, Japón",
      duration: "14 Noches",
      price: "$4,200",
      includes: ["Vuelos", "Onsen Resort", "Ski Pass", "Guía Local"],
      image: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=800",
      tag: "Adventure"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Paquetes <span className="text-blue-400">Todo Incluido</span></h1>
          <p className="text-white/60">Selección curada de las mejores experiencias de esquí.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all flex flex-col">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {pkg.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="text-blue-400 font-black">{pkg.price}</div>
                </div>
                <p className="text-sm text-white/40 mb-6 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {pkg.resort} • {pkg.duration}
                </p>
                
                <div className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <Zap className="w-3 h-3 text-blue-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[44px]">
                  Reservar Paquete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

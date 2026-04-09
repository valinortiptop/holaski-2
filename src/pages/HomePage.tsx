// @ts-nocheck
import { useState } from 'react';
import AISearchBar from '../components/AISearchBar';
import AISearchResults from '../components/AISearchResults';
import { supabase } from '../lib/supabase';
import { Mountain, Users, Calendar, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-search', query }
      });
      if (error) throw error;
      setResults(data.results || []);
      const el = document.getElementById('results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1.1]">
            Tu Viaje de Esquí <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reimaginado</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Describe tus vacaciones ideales y nuestra IA encontrará el destino perfecto, vuelos y alojamiento en segundos.
          </p>
          <AISearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
      </section>

      {/* Results Section */}
      <div id="results" className="scroll-mt-24">
        {results.length > 0 && (
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-white mb-4">Recomendaciones para ti</h2>
                <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
              </div>
              <AISearchResults results={results} />
            </div>
          </section>
        )}
      </div>

      {/* Features */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Mountain, title: 'Destinos Globales', desc: 'Desde los Alpes hasta los Andes y Japón.' },
              { icon: Users, title: 'Para Todos', desc: 'Familiar, parejas o grupos de expertos.' },
              { icon: Calendar, title: 'Todo Incluido', desc: 'Vuelos, hoteles, pases y equipos.' },
              { icon: ShieldCheck, title: 'Seguridad', desc: 'Soporte 24/7 durante todo tu viaje.' },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6">
                  <f.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
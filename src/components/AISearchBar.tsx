// @ts-nocheck
import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface Props { onSearch: (q: string) => void; isLoading: boolean; }

const TAGS = ['Alpes', 'Japón', 'Familiar', 'Nieve Polvo', 'Económico'];

export default function AISearchBar({ onSearch, isLoading }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) onSearch(query.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-blue-300">Inteligencia Artificial</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-[#0B1628]/80 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full p-2 focus-within:border-blue-500/40 transition-all shadow-2xl">
          <div className="pl-5 pr-2 hidden md:block">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Dónde te gustaría esquiar?"
            className="flex-1 bg-transparent border-none text-white placeholder:text-white/30 py-3 md:py-4 px-4 md:px-0 text-base outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white h-12 md:h-14 px-6 md:px-10 rounded-xl md:rounded-full font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-600/30"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /><span className="hidden md:inline">Buscar</span></>}
          </button>
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {TAGS.map(t => (
          <button key={t} onClick={() => { setQuery(t); onSearch(t); }} disabled={isLoading} className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all disabled:opacity-30">
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

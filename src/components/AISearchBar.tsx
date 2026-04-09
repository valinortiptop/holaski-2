// @ts-nocheck
import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const tags = ['Familiar', 'Nieve polvo', 'Alpes', 'Económico', 'Japón', 'Principiante'];

export default function AISearchBar({ onSearch, isLoading }: AISearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) onSearch(query.trim());
  };

  const handleTag = (tag: string) => {
    if (isLoading) return;
    setQuery(tag);
    onSearch(tag);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" /> Motor de Recomendación IA
        </span>
      </div>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1.5 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-navy-950/80 backdrop-blur-2xl border border-white/15 rounded-2xl md:rounded-full p-2.5 focus-within:border-blue-400/40 transition-all shadow-2xl">
          <div className="pl-4 pr-2 shrink-0"><Sparkles className="w-5 h-5 text-blue-400" /></div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Dinos cómo quieres tu viaje..."
            className="flex-1 bg-transparent border-none text-white placeholder:text-white/30 py-3 md:py-4 text-base outline-none min-w-0"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !query.trim()} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-full font-bold transition-all flex items-center gap-2 shrink-0 shadow-xl shadow-blue-600/30">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /><span className="hidden md:inline">Buscar</span></>}
          </button>
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <button key={tag} onClick={() => handleTag(tag)} disabled={isLoading} className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all text-white/50 hover:text-white disabled:opacity-40">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
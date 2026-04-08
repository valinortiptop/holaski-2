// @ts-nocheck
import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const tags = ['Familiar', 'Nieve polvo', 'Alpes', 'Economico', 'Japon', 'Principiante'];

export default function AISearchBar({ onSearch, isLoading }: AISearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleTag = (tag: string) => {
    if (isLoading) return;
    setQuery(tag);
    onSearch(tag);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-blue-300/80 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          Potenciado por IA
        </span>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-blue-500/15 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-white/[0.07] backdrop-blur-xl border border-white/[0.15] rounded-2xl md:rounded-full p-2 focus-within:border-blue-500/40 transition-all shadow-2xl">
          <div className="pl-4 pr-2 shrink-0">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: 'Busco un resort familiar en los Alpes con nieve polvo'..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/30 py-3 md:py-4 text-sm md:text-base outline-none min-h-[44px]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-3 md:p-4 rounded-xl md:rounded-full transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTag(tag)}
            className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 min-h-[44px] md:min-h-0"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

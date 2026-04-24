// @ts-nocheck
// src/components/DestinationSelect.tsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, ChevronDown, Search, Check, X } from 'lucide-react';
import { destinationsByCountry, findDestinationLabel } from '../data/destinations';

interface DestinationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function DestinationSelect({
  value,
  onChange,
  placeholder = 'Selecciona un destino',
  required = false,
}: DestinationSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedLabel = value ? findDestinationLabel(value) : '';

  // Flatten + filter for keyboard navigation
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinationsByCountry;
    return destinationsByCountry
      .map((g) => ({
        ...g,
        destinations: g.destinations.filter(
          (d) =>
            d.label.toLowerCase().includes(q) ||
            g.country.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.destinations.length > 0);
  }, [query]);

  const flatList = useMemo(
    () => filteredGroups.flatMap((g) => g.destinations),
    [filteredGroups]
  );

  // Click outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setActiveIndex(-1);
      }
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLButtonElement>(
      `[data-idx="${activeIndex}"]`
    );
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setQuery('');
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(flatList[activeIndex].value);
    }
  };

  // Track flat index per item for keyboard nav
  let flatIdx = -1;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full bg-navy-900 border rounded-2xl px-6 py-5 text-left flex items-center justify-between gap-3 transition-all min-h-[56px] ${
          open
            ? 'border-blue-500 ring-2 ring-blue-500/30'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
          <span
            className={`truncate ${selectedLabel ? 'text-white' : 'text-slate-500'}`}
          >
            {selectedLabel || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Hidden input for required validation */}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden
          required
          value={value}
          onChange={() => {}}
          className="absolute opacity-0 pointer-events-none h-0 w-0"
        />
      )}

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-navy-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onKeyDown={handleKeyDown}
        >
          {/* Search bar */}
          <div className="p-3 border-b border-white/5 bg-navy-950 sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Buscar destino o país..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm outline-none focus:border-blue-500/50 placeholder:text-slate-600"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    searchRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Grouped scrollable list */}
          <div
            ref={listRef}
            className="max-h-80 md:max-h-96 overflow-y-auto custom-scrollbar"
          >
            {filteredGroups.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500 text-sm">
                No encontramos destinos para "{query}"
              </div>
            )}

            {filteredGroups.map((group) => (
              <div key={group.country}>
                {/* Sticky country header */}
                <div className="sticky top-0 z-[1] bg-navy-950/95 backdrop-blur-md border-b border-white/5 px-5 py-2 flex items-center gap-2">
                  <span className="text-base">{group.flag}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-400">
                    {group.country}
                  </span>
                  <span className="text-[10px] text-slate-600 ml-auto">
                    {group.destinations.length}
                  </span>
                </div>

                {/* Destinations in this country */}
                <div className="py-1">
                  {group.destinations.map((dest) => {
                    flatIdx++;
                    const isActive = flatIdx === activeIndex;
                    const isSelected = value === dest.value;
                    return (
                      <button
                        key={dest.value}
                        type="button"
                        data-idx={flatIdx}
                        onClick={() => handleSelect(dest.value)}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        className={`w-full text-left px-5 py-3 flex items-center justify-between gap-3 transition-colors min-h-[44px] ${
                          isActive ? 'bg-blue-600/20' : 'hover:bg-white/5'
                        } ${isSelected ? 'text-blue-300' : 'text-white'}`}
                      >
                        <span className="text-sm truncate">{dest.label}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="border-t border-white/5 px-4 py-2 bg-navy-950 flex items-center justify-between text-[10px] text-slate-600">
            <span>↑↓ navegar · ↵ seleccionar · esc cerrar</span>
            <span>{flatList.length} destinos</span>
          </div>
        </div>
      )}
    </div>
  );
}
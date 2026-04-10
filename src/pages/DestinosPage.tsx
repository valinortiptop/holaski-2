import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Snowflake, Mountain, Filter, X, ChevronRight } from 'lucide-react'
import { RESORTS, CONTINENTS, COUNTRIES, Resort } from '../data/resorts'

const DIFFICULTY_MAP: Record<string, number> = {
  'Todos': 0, 'Principiante': 1, 'Intermedio': 2, 'Avanzado': 3, 'Experto': 4
}

function getDifficultyLevel(resort: Resort): number {
  const { black, red } = resort.difficulty
  if (black >= 20) return 4
  if (red >= 30 || black >= 10) return 3
  if (red >= 20) return 2
  return 1
}

const PRICE_LABELS = ['€', '€€', '€€€']

export default function DestinosPage() {
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('Todos')
  const [country, setCountry] = useState('Todos')
  const [difficulty, setDifficulty] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return RESORTS.filter(r => {
      const matchSearch = !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.country.toLowerCase().includes(search.toLowerCase()) ||
        r.region.toLowerCase().includes(search.toLowerCase())
      const matchContinent = continent === 'Todos' || r.continent === continent
      const matchCountry = country === 'Todos' || r.country === country
      const matchDifficulty = difficulty === 'Todos' || getDifficultyLevel(r) >= DIFFICULTY_MAP[difficulty]
      return matchSearch && matchContinent && matchCountry && matchDifficulty
    })
  }, [search, continent, country, difficulty])

  const clearFilters = useCallback(() => {
    setSearch(''); setContinent('Todos'); setCountry('Todos'); setDifficulty('Todos')
  }, [])

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Destinos de <span className="text-blue-500">Leyenda</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Explora las estaciones de esquí más exclusivas del mundo, seleccionadas por expertos para garantizar una experiencia inigualable.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Busca por nombre, país o región..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-navy-950/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold transition-all border ${
                showFilters ? 'bg-blue-600 border-blue-500 text-white' : 'bg-navy-950/50 border-white/10 text-slate-400'
              }`}
            >
              <Filter className="w-5 h-5" /> {showFilters ? 'Ocultar Filtros' : 'Filtros'}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-navy-950/30 rounded-[2rem] border border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase px-2">Continente</label>
                <select
                  value={continent}
                  onChange={(e) => setContinent(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  {CONTINENTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase px-2">País</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase px-2">Nivel Técnico</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {(continent !== 'Todos' || country !== 'Todos' || difficulty !== 'Todos') && (
                <div className="md:col-span-3 flex justify-end">
                  <button onClick={clearFilters} className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:text-blue-300">
                    <X className="w-4 h-4" /> Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((resort) => (
            <Link
              key={resort.id}
              to={`/destinos/${resort.slug}`}
              className="group bg-navy-950/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={resort.imageUrl}
                  alt={resort.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-bold flex items-center gap-2">
                  <span>{resort.flag}</span>
                  <span>{resort.country}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase">{resort.name}</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {resort.region}
                    </p>
                  </div>
                  <div className="text-blue-500 font-black text-lg">
                    {PRICE_LABELS[resort.priceLevel - 1]}
                  </div>
                </div>

                <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                  {resort.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mountain className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Pistas</div>
                      <div className="font-bold">{resort.slopesKm}km</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Snowflake className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Cota Máx.</div>
                      <div className="font-bold">{resort.altitudeTop}m</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-blue-400 font-bold text-sm uppercase group-hover:tracking-widest transition-all">Ver detalles</span>
                  <ChevronRight className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-navy-950/30 rounded-[3rem] border border-dashed border-white/10">
            <Snowflake className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron destinos</h3>
            <p className="text-slate-500 mb-8">Intenta ajustar los filtros de búsqueda.</p>
            <button onClick={clearFilters} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
              Ver todos los destinos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
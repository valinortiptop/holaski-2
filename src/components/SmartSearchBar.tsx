// @ts-nocheck
// src/components/SmartSearchBar.tsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, ChevronDown, X, Users } from 'lucide-react'

interface DateRange { start: string; end: string }

const SKI_DESTINATIONS = [
  'Cerro Catedral, Bariloche',
  'Las Leñas, Mendoza',
  'Valle Nevado, Santiago',
  'Chapelco, San Martín',
  'Whistler, Canadá',
  'Vail, Colorado',
  'Aspen, Colorado',
  'Chamonix, Francia',
  'Zermatt, Suiza',
  'Verbier, Suiza',
  'Niseko, Japón',
  'St. Anton, Austria',
]

function getSmartDates(): { label: string; start: string; end: string }[] {
  const today = new Date()
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }

  // Next long weekend (Friday to Monday)
  const dayOfWeek = today.getDay()
  const daysToFriday = dayOfWeek <= 5 ? (5 - dayOfWeek === 0 ? 7 : 5 - dayOfWeek) : 6
  const nextFriday = addDays(today, daysToFriday + (daysToFriday === 0 ? 7 : 0))

  // Next month first weekend
  const nextMonthFirstDay = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const firstFriday = addDays(nextMonthFirstDay, (5 - nextMonthFirstDay.getDay() + 7) % 7)

  // Vacaciones de Invierno (July in Southern Hemisphere)
  const inviernoStart = new Date(today.getFullYear(), 6, 14) // July 14
  const inviernoFix = inviernoStart < today ? new Date(today.getFullYear() + 1, 6, 14) : inviernoStart

  // Semana Santa
  const year = today.getFullYear()
  const semanaSantaStart = new Date(year, 3, 14) // approx mid April
  const semanaSantaFix = semanaSantaStart < today ? new Date(year + 1, 3, 14) : semanaSantaStart

  return [
    { label: '🏖️ Próximo Fin de Semana Largo', start: fmt(nextFriday), end: fmt(addDays(nextFriday, 3)) },
    { label: '📅 Próximo Mes', start: fmt(firstFriday), end: fmt(addDays(firstFriday, 7)) },
    { label: '❄️ Vacaciones de Invierno', start: fmt(inviernoFix), end: fmt(addDays(inviernoFix, 14)) },
    { label: '✝️ Semana Santa', start: fmt(semanaSantaFix), end: fmt(addDays(semanaSantaFix, 7)) },
    { label: '🎄 Fin de Año', start: fmt(new Date(today.getFullYear() + (today.getMonth() >= 11 ? 1 : 0), 11, 27)), end: fmt(new Date(today.getFullYear() + (today.getMonth() >= 11 ? 1 : 0) + 1, 0, 3)) },
  ]
}

export default function SmartSearchBar() {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' })
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTravelers, setShowTravelers] = useState(false)
  const [dateMode, setDateMode] = useState<'smart' | 'custom'>('smart')
  const destRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const travelersRef = useRef<HTMLDivElement>(null)

  const smartDates = getSmartDates()

  const filteredDests = destination.length > 0
    ? SKI_DESTINATIONS.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
    : SKI_DESTINATIONS

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setShowDestSuggestions(false)
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setShowDatePicker(false)
      if (travelersRef.current && !travelersRef.current.contains(e.target as Node)) setShowTravelers(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = useCallback(() => {
    if (!destination) return
    const params = new URLSearchParams({
      destination,
      checkIn: dateRange.start,
      checkOut: dateRange.end,
      adults: adults.toString(),
      children: children.toString(),
    })
    navigate(`/buscar?${params.toString()}`)
  }, [destination, dateRange, adults, children, navigate])

  const formatDateDisplay = () => {
    if (!dateRange.start) return 'Elige tus fechas'
    const start = new Date(dateRange.start + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
    const end = dateRange.end ? new Date(dateRange.end + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '...'
    return `${start} → ${end}`
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 shadow-2xl">

        {/* Destination */}
        <div ref={destRef} className="relative flex-1 min-w-0">
          <div className="flex items-center px-4 py-3 gap-3">
            <MapPin className="text-blue-400 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={e => { setDestination(e.target.value); setShowDestSuggestions(true) }}
              onFocus={() => setShowDestSuggestions(true)}
              placeholder="¿A dónde quieres ir?"
              className="bg-transparent border-none text-white placeholder-white/50 focus:outline-none w-full font-medium text-sm md:text-base"
            />
            {destination && (
              <button onClick={() => setDestination('')} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {showDestSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
              {filteredDests.slice(0, 6).map(dest => (
                <button
                  key={dest}
                  onClick={() => { setDestination(dest); setShowDestSuggestions(false) }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 flex items-center gap-3 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-white/80">{dest}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block w-px h-8 bg-white/20 flex-shrink-0" />

        {/* Date Picker */}
        <div ref={dateRef} className="relative flex-1 min-w-0">
          <button
            onClick={() => { setShowDatePicker(!showDatePicker); setShowTravelers(false) }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Calendar className="text-blue-400 w-5 h-5 flex-shrink-0" />
            <span className={`text-sm md:text-base font-medium truncate ${dateRange.start ? 'text-white' : 'text-white/50'}`}>
              {formatDateDisplay()}
            </span>
            <ChevronDown className={`w-4 h-4 text-white/40 ml-auto flex-shrink-0 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
          </button>

          {showDatePicker && (
            <div className="absolute top-full left-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl z-50 shadow-2xl p-4 w-80">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setDateMode('smart')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${dateMode === 'smart' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  ✨ Sugerencias
                </button>
                <button
                  onClick={() => setDateMode('custom')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${dateMode === 'custom' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  📅 Personalizado
                </button>
              </div>

              {dateMode === 'smart' ? (
                <div className="space-y-2">
                  {smartDates.map(sd => (
                    <button
                      key={sd.label}
                      onClick={() => { setDateRange({ start: sd.start, end: sd.end }); setShowDatePicker(false) }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{sd.label}</div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {new Date(sd.start + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        {' → '}
                        {new Date(sd.end + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1 block">Check-in</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1 block">Check-out</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      min={dateRange.start || new Date().toISOString().split('T')[0]}
                      onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {dateRange.start && dateRange.end && (
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Confirmar fechas
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:block w-px h-8 bg-white/20 flex-shrink-0" />

        {/* Travelers */}
        <div ref={travelersRef} className="relative flex-shrink-0">
          <button
            onClick={() => { setShowTravelers(!showTravelers); setShowDatePicker(false) }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Users className="text-blue-400 w-5 h-5" />
            <span className="text-sm font-medium text-white/80 whitespace-nowrap">
              {adults + children} {adults + children === 1 ? 'viajero' : 'viajeros'}
            </span>
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showTravelers ? 'rotate-180' : ''}`} />
          </button>

          {showTravelers && (
            <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl z-50 shadow-2xl p-4 w-64">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <div className="text-sm font-bold text-white">Adultos</div>
                  <div className="text-xs text-white/40">Mayores de 12 años</div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setAdults(a => Math.max(1, a - 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">-</button>
                  <span className="w-4 text-center font-bold">{adults}</span>
                  <button onClick={() => setAdults(a => Math.min(8, a + 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-bold text-white">Niños</div>
                  <div className="text-xs text-white/40">Menores de 12 años</div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setChildren(c => Math.max(0, c - 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">-</button>
                  <span className="w-4 text-center font-bold">{children}</span>
                  <button onClick={() => setChildren(c => Math.min(6, c + 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold transition-colors">+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!destination}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all group flex-shrink-0 min-h-[52px]"
        >
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="md:hidden lg:inline">Buscar</span>
        </button>
      </div>
    </div>
  )
}
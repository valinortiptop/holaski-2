// @ts-nocheck
// src/pages/SearchResultsPage.tsx
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Star, MapPin, ArrowRight, Loader2, AlertCircle, Hotel, Ticket, Car, ChevronDown, ChevronUp } from 'lucide-react'
import ErrorBoundary from '../components/ErrorBoundary'

interface HotelResult {
  hotelId: string
  name: string
  stars: string
  minRate: string
  maxRate: string
  currency: string
  rooms: any[]
}

interface SkiPackage {
  package_title: string
  destination: string
  highlights: string[]
  hotel: { name: string; stars: number; total_usd: number }
  ski_pass: { description: string; days: number; price_per_person_usd: number }
  transfer: { description: string; price_per_group_usd: number }
  cost_breakdown: { hotel_total: number; ski_pass_total: number; transfer_total: number; grand_total_usd: number }
  itinerary: { day: number; title: string; description: string }[]
  best_for: string
}

interface PackageCardProps {
  hotel: HotelResult
  destination: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
}

const PackageCard = ({ hotel, destination, checkIn, checkOut, adults, children }: PackageCardProps) => {
  const [pkg, setPkg] = useState<SkiPackage | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(false)

  const buildPackage = useCallback(async () => {
    if (pkg || loading) return
    setLoading(true)
    setError(false)
    try {
      const { data, error: fnError } = await supabase.functions.invoke('api-handler', {
        body: {
          action: 'build-package',
          hotel,
          destination,
          checkIn,
          checkOut,
          adults,
          children,
          skillLevel: 'intermediate',
        }
      })
      if (fnError) throw fnError
      setPkg(data.package)
    } catch (err) {
      console.error('build-package error:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [hotel, destination, checkIn, checkOut, adults, children, pkg, loading])

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 5

  const starCount = parseInt(hotel.stars) || 3

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all">
      {/* Hotel Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Hotel className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Hotel</span>
            </div>
            <h3 className="text-xl font-bold text-white truncate">{hotel.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(starCount)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-white/40 mb-1">Desde</div>
            <div className="text-2xl font-black text-white">
              USD ${parseFloat(hotel.minRate || '0').toFixed(0)}
            </div>
            <div className="text-xs text-white/40">por noche</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-white/50">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination}</span>
          <span className="mx-1">·</span>
          <span>{nights} noches</span>
        </div>
      </div>

      {/* Package Section */}
      <div className="p-6">
        {!pkg && !loading && !error && (
          <button
            onClick={buildPackage}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all group"
          >
            <span>✨ Armar Paquete Completo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-3 py-8 text-white/60">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span className="text-sm">IA armando tu paquete...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 py-4 text-red-400/80 bg-red-500/10 rounded-xl px-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">No se pudo generar el paquete. Intenta de nuevo.</span>
            <button onClick={() => { setError(false); buildPackage() }} className="ml-auto text-xs underline">Reintentar</button>
          </div>
        )}

        {pkg && (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">{pkg.package_title}</h4>
            <p className="text-sm text-white/50 italic">Ideal para: {pkg.best_for}</p>

            <div className="space-y-2">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white/5 rounded-2xl p-4 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Hotel className="w-4 h-4 text-blue-400" />
                <span className="text-white/60 flex-1">Hotel ({nights} noches)</span>
                <span className="font-bold">USD ${pkg.cost_breakdown.hotel_total}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="w-4 h-4 text-purple-400" />
                <span className="text-white/60 flex-1">Ski Pass ({pkg.ski_pass.days} días)</span>
                <span className="font-bold">USD ${pkg.cost_breakdown.ski_pass_total}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h-4 text-cyan-400" />
                <span className="text-white/60 flex-1">Traslado privado</span>
                <span className="font-bold">USD ${pkg.cost_breakdown.transfer_total}</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2 flex justify-between items-center">
                <span className="font-black text-white">Total del paquete</span>
                <span className="text-xl font-black text-blue-400">USD ${pkg.cost_breakdown.grand_total_usd}</span>
              </div>
            </div>

            {/* Itinerary Toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between text-sm text-white/60 hover:text-white transition-colors pt-2"
            >
              <span>Ver itinerario día a día</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
              <div className="space-y-3 pt-2">
                {pkg.itinerary.map(day => (
                  <div key={day.day} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-black text-blue-400 flex-shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{day.title}</div>
                      <div className="text-xs text-white/50 mt-0.5">{day.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-2xl font-bold text-white transition-all mt-2">
              Reservar este paquete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const destination = searchParams.get('destination') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const adults = parseInt(searchParams.get('adults') || '2')
  const children = parseInt(searchParams.get('children') || '0')

  const [hotels, setHotels] = useState<HotelResult[]>([])
  const [loading, setLoading] = useState(true)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    if (!destination) return
    setLoading(true)

    const search = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('api-handler', {
          body: { action: 'search-hotels', destination, checkIn, checkOut, adults, children }
        })
        if (error) throw error
        setHotels(data.hotels || [])
        setFallback(!!data.fallback)
      } catch (err) {
        console.error('search error:', err)
        setHotels([
          { hotelId: 'F001', name: 'Llao Llao Hotel & Resort', stars: '5', minRate: '320', maxRate: '480', currency: 'USD', rooms: [] },
          { hotelId: 'F002', name: 'Panamericano Bariloche', stars: '4', minRate: '180', maxRate: '260', currency: 'USD', rooms: [] },
          { hotelId: 'F003', name: 'Design Suites Bariloche', stars: '4', minRate: '150', maxRate: '220', currency: 'USD', rooms: [] },
        ])
        setFallback(true)
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [destination, checkIn, checkOut, adults, children])

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <ErrorBoundary>
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span>Resultados</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              {destination}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mt-2">
              {checkIn && checkOut && (
                <span>
                  {new Date(checkIn + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
                  {' → '}
                  {new Date(checkOut + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
                  {nights ? ` · ${nights} noches` : ''}
                </span>
              )}
              <span>{adults} adultos{children > 0 ? `, ${children} niños` : ''}</span>
            </div>
            {fallback && (
              <div className="mt-4 flex items-center gap-2 text-amber-400/80 text-sm bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl w-fit">
                <AlertCircle className="w-4 h-4" />
                Mostrando hoteles de ejemplo — el inventario en vivo estará disponible pronto.
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map(i => (
                <div key={i} className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
                  <div className="p-6 border-b border-white/5 space-y-3">
                    <div className="h-4 w-20 bg-white/10 rounded" />
                    <div className="h-6 w-48 bg-white/10 rounded" />
                    <div className="h-3 w-32 bg-white/5 rounded" />
                  </div>
                  <div className="p-6">
                    <div className="h-12 w-full bg-white/10 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-2xl font-bold mb-2">Sin resultados</h3>
              <p className="text-white/50 mb-6">No encontramos hoteles para esta búsqueda.</p>
              <Link to="/" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-colors">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <PackageCard
                  key={hotel.hotelId}
                  hotel={hotel}
                  destination={destination}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adults={adults}
                  children={children}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors">
              ← Nueva búsqueda
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
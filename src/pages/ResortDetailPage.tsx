// @ts-nocheck
// src/pages/ResortDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Resort, DifficultyJson } from '../types/resort';
import { Loader2, MapPin, Mountain, Layers, Wind, ChevronLeft, Snowflake, ArrowRight } from 'lucide-react';

function parseDiff(raw: DifficultyJson | string | null | undefined): DifficultyJson {
  const fallback: DifficultyJson = { beginner: 33, intermediate: 34, advanced: 33 };
  if (!raw) return fallback;
  if (typeof raw === 'object' && raw !== null) return raw as DifficultyJson;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as DifficultyJson; } catch { return fallback; }
  }
  return fallback;
}

function DiffBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-white/60">{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
      <div className="text-blue-400 mb-2">{icon}</div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-black break-words">{value}</div>
    </div>
  );
}

export default function ResortDetailPage() {
  const { slug } = useParams();
  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchResort() {
      setLoading(true);
      setError('');
      try {
        const { data, error: dbErr } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (dbErr) {
          console.error('[HolaSki] Resort detail error:', dbErr);
          setError(dbErr.message);
          return;
        }
        if (!cancelled && data) {
          setResort(data as Resort);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido al cargar la estación');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchResort();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error || !resort) {
    return (
      <div className="text-center py-40 px-4">
        <Snowflake className="w-16 h-16 text-white/10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Estación no encontrada</h2>
        <p className="text-white/40 text-sm mb-6 max-w-md mx-auto break-words">
          {error || `No pudimos encontrar la estación "${slug}".`}
        </p>
        <Link
          to="/resorts"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-colors min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a destinos
        </Link>
      </div>
    );
  }

  const diff = parseDiff(resort.difficulty_json);
  const imgFallback = 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800';
  const desnivel = (resort.altitude_top && resort.altitude_base)
    ? resort.altitude_top - resort.altitude_base
    : null;

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <img
          src={resort.image_url || imgFallback}
          className="w-full h-full object-cover"
          alt={resort.name}
          onError={(e) => { (e.target as HTMLImageElement).src = imgFallback; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        <div className="absolute top-28 left-4 md:left-8">
          <Link
            to="/resorts"
            className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors min-h-[44px]"
          >
            <ChevronLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-4 md:left-12 max-w-4xl pr-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            <MapPin className="w-3 h-3" /> {resort.region}, {resort.country}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 break-words">{resort.name}</h1>
          {resort.description && (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl break-words">
              {resort.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Mountain className="w-5 h-5" />}
              label="Cota Máxima"
              value={resort.altitude_top ? `${resort.altitude_top.toLocaleString()}m` : '—'}
            />
            <StatCard
              icon={<Mountain className="w-5 h-5" />}
              label="Cota Base"
              value={resort.altitude_base ? `${resort.altitude_base.toLocaleString()}m` : '—'}
            />
            <StatCard
              icon={<Layers className="w-5 h-5" />}
              label="Pistas"
              value={resort.runs_total ?? '—'}
            />
            <StatCard
              icon={<Wind className="w-5 h-5" />}
              label="Remontes"
              value={resort.lifts_total ?? '—'}
            />
          </div>

          {/* Desnivel */}
          {desnivel && (
            <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Desnivel Esquiable</p>
                <p className="text-3xl font-black text-blue-400">{desnivel.toLocaleString()}m</p>
              </div>
              <Mountain className="w-12 h-12 text-blue-400/20" />
            </div>
          )}

          {/* Difficulty breakdown */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Dificultad de Pistas</h3>
            <div className="space-y-5">
              <DiffBar label="🟢 Principiante" pct={diff.beginner} color="bg-green-500" />
              <DiffBar label="🔵 Intermedio" pct={diff.intermediate} color="bg-blue-500" />
              <DiffBar label="🔴 Avanzado" pct={diff.advanced} color="bg-red-500" />
            </div>
          </div>

          {/* Gallery */}
          {resort.gallery_urls && resort.gallery_urls.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Galería</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resort.gallery_urls.map((url, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={url}
                      alt={`${resort.name} ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = imgFallback; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price level */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Nivel de Precio</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${i <= (resort.price_level || 2) ? 'bg-amber-400' : 'bg-white/10'}`}
                />
              ))}
            </div>
            <p className="text-white/40 text-xs mt-3">
              {(resort.price_level || 2) <= 2 && 'Económico — ideal para presupuestos ajustados'}
              {(resort.price_level || 2) === 3 && 'Moderado — buen equilibrio calidad-precio'}
              {(resort.price_level || 2) >= 4 && 'Premium — experiencia de lujo'}
            </p>
          </div>

          {/* Quick info */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Información Rápida</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">País</span>
                <span className="font-bold">{resort.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Región</span>
                <span className="font-bold truncate max-w-[160px]">{resort.region}</span>
              </div>
              {resort.altitude_top && (
                <div className="flex justify-between">
                  <span className="text-white/50">Altitud máx.</span>
                  <span className="font-bold">{resort.altitude_top.toLocaleString()}m</span>
                </div>
              )}
              {resort.runs_total && (
                <div className="flex justify-between">
                  <span className="text-white/50">Total pistas</span>
                  <span className="font-bold">{resort.runs_total}</span>
                </div>
              )}
              {resort.lifts_total && (
                <div className="flex justify-between">
                  <span className="text-white/50">Total remontes</span>
                  <span className="font-bold">{resort.lifts_total}</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/planner"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-center py-4 rounded-2xl font-bold transition-colors min-h-[44px]"
          >
            <span className="flex items-center justify-center gap-2">
              Planificar viaje aquí <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
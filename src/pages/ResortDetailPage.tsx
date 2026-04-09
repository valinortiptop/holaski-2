// src/pages/ResortDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Mountain, Snowflake, Clock, Users, ArrowLeft, Sparkles, Loader2, ChevronDown, ChevronUp, Thermometer, Plane, Utensils } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FALLBACK_RESORTS } from '../data/resorts';

export default function ResortDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resort, setResort] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = FALLBACK_RESORTS.find(r => r.id === id);
    setResort(found || FALLBACK_RESORTS[0]);

    const loadFromDB = async () => {
      try {
        const { data } = await supabase.from('ski_resorts').select('*').eq('id', id).single();
        if (data) {
          const f = FALLBACK_RESORTS.find(r => r.id === id);
          setResort({ ...f, ...data });
        }
      } catch {}
    };
    loadFromDB();
  }, [id]);

  const loadAIInfo = async () => {
    if (info || !resort) return;
    setLoadingInfo(true);
    try {
      const { data } = await supabase.functions.invoke('api-handler', {
        body: { action: 'ai-resort-info', resortName: resort.name, country: resort.country }
      });
      if (data?.info && Object.keys(data.info).length > 0) {
        setInfo(data.info);
      } else {
        setInfo({ elevation_top: resort.elevation || '3,000m', total_runs: resort.runs || 150, lifts: resort.lifts || 30, snowfall_annual: '300cm+', season: 'Nov - Abr', best_month: 'Febrero', avg_temp: '-8°C', nearby_airport: 'Aeropuerto Regional', transfer_time: '2h', top_restaurants: ['Restaurant Local 1', 'Restaurant Local 2'], top_activities: ['Esquí nocturno', 'Snowboard park', 'Spa y wellness'], tips: ['Reserva con anticipación en temporada alta', 'Las mejores condiciones son en febrero'] });
      }
    } catch {
      setInfo({ elevation_top: resort?.elevation || '3,000m', total_runs: resort?.runs || 150, lifts: resort?.lifts || 30, season: 'Nov - Abr', best_month: 'Febrero' });
    }
    setLoadingInfo(false);
  };

  if (!resort) return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="pt-0 min-h-screen">
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={resort.image_url} alt={resort.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-[#0B1628]/50 to-transparent" />
        <div className="absolute top-24 left-4 sm:left-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-sm hover:bg-white/20 transition">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2"><MapPin className="w-4 h-4" />{resort.country}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">{resort.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              {resort.rating && <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="font-semibold">{resort.rating}</span></div>}
              {resort.difficulty && <span className="bg-blue-500/20 text-blue-300 rounded-lg px-3 py-1.5 text-sm">{resort.difficulty}</span>}
              {resort.price_from && <span className="text-2xl font-bold text-blue-400">{resort.price_from}<span className="text-sm text-gray-400 font-normal"> / persona</span></span>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Mountain, label: 'Elevación', val: resort.elevation || '3,000m' },
            { icon: Snowflake, label: 'Pistas', val: `${resort.runs || 150}+` },
            { icon: Users, label: 'Teleféricos', val: `${resort.lifts || 30}` },
            { icon: Clock, label: 'Temporada', val: 'Nov - Abr' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <s.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold">{s.val}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Sobre {resort.name}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">{resort.description}</p>
        </div>

        <div className="mb-12">
          <button onClick={() => { setShowMore(!showMore); if (!info) loadAIInfo(); }} className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 py-3 rounded-xl font-semibold transition-all">
            <Sparkles className="w-4 h-4" />
            {showMore ? 'Ocultar' : 'Ver más info con AI'}
            {loadingInfo ? <Loader2 className="w-4 h-4 animate-spin" /> : showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMore && (
            <div className="mt-6 space-y-6 animate-fade-up">
              {loadingInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1,2,3].map(i => <div key={i} className="h-40 bg-white/5 rounded-xl animate-shimmer" />)}
                </div>
              ) : info ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {info.avg_temp && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3"><Thermometer className="w-5 h-5 text-blue-400" /><h3 className="font-semibold">Clima</h3></div>
                        <p className="text-gray-400 text-sm">Temp. promedio: {info.avg_temp}</p>
                        {info.snowfall_annual && <p className="text-gray-400 text-sm">Nevada anual: {info.snowfall_annual}</p>}
                        {info.best_month && <p className="text-gray-400 text-sm">Mejor mes: {info.best_month}</p>}
                      </div>
                    )}
                    {info.nearby_airport && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3"><Plane className="w-5 h-5 text-blue-400" /><h3 className="font-semibold">Acceso</h3></div>
                        <p className="text-gray-400 text-sm">Aeropuerto: {info.nearby_airport}</p>
                        {info.transfer_time && <p className="text-gray-400 text-sm">Traslado: {info.transfer_time}</p>}
                      </div>
                    )}
                    {info.top_restaurants && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3"><Utensils className="w-5 h-5 text-blue-400" /><h3 className="font-semibold">Gastronomía</h3></div>
                        <ul className="space-y-1">{info.top_restaurants.map((r: string, i: number) => <li key={i} className="text-gray-400 text-sm">• {r}</li>)}</ul>
                      </div>
                    )}
                  </div>
                  {info.tips && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                      <h3 className="font-semibold text-blue-400 mb-2">💡 Tips de Viaje</h3>
                      <ul className="space-y-1">{info.tips.map((t: string, i: number) => <li key={i} className="text-gray-300 text-sm">• {t}</li>)}</ul>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('/planear')} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition text-lg">
            <Sparkles className="w-5 h-5" /> Planear Viaje a {resort.name}
          </button>
          <button onClick={() => navigate('/contacto')} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl font-semibold transition text-lg">
            Hablar con Experto
          </button>
        </div>
      </div>
    </div>
  );
}
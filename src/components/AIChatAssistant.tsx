import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, MapPin, Star, X, Mountain, Wine, Zap,
  Heart, Snowflake, User, Users, Baby, RotateCcw, ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OptionItem {
  label: string;
  value: string;
  icon?: any;
  desc?: string;
}

interface ResultItem {
  resort: string;
  country: string;
  description: string;
  price_from: string;
  duration: string;
  highlights: string[];
  rating: number;
  image: string;
}

interface ChatMsg {
  id: string;
  from: 'nieve' | 'user';
  text: string;
  kind: 'text' | 'options' | 'results';
  options?: OptionItem[];
  results?: ResultItem[];
  multi?: boolean;
}

interface ChatMessageProps {
  message: ChatMsg;
  isLastOptions: boolean;
  step: Step;
  selExps: string[];
  onPickDate: (label: string) => void;
  onPickGuests: (label: string) => void;
  onToggleExp: (value: string) => void;
  onSubmitExps: () => void;
  navigate: (path: string) => void;
  onRestart: () => void;
}

interface OptionsListProps {
  options: OptionItem[];
  multi?: boolean;
  step: Step;
  selExps: string[];
  onPickDate: (label: string) => void;
  onPickGuests: (label: string) => void;
  onToggleExp: (value: string) => void;
  onSubmitExps: () => void;
}

interface ResultsListProps {
  results: ResultItem[];
  navigate: (path: string) => void;
  onRestart: () => void;
}

function ChatMessage({ 
  message, 
  isLastOptions, 
  step, 
  selExps, 
  onPickDate, 
  onPickGuests, 
  onToggleExp, 
  onSubmitExps, 
  navigate, 
  onRestart 
}: ChatMessageProps) {
  return (
    <div className={`flex gap-2.5 ${message.from === 'user' ? 'flex-row-reverse' : ''}`}>
      {message.from === 'nieve' && (
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[90%] ${message.from === 'user' ? 'ml-auto' : ''}`}>
        {/* Text bubble */}
        {message.kind === 'text' && (
          <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${message.from === 'nieve' ? 'bg-white/[0.08] text-gray-100 rounded-tl-sm' : 'bg-blue-600 text-white rounded-tr-sm'}`}>
            {message.text}
          </div>
        )}

        {/* Options bubble */}
        {message.kind === 'options' && (
          <div>
            <div className="bg-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-100 mb-2.5">
              {message.text}
            </div>
            {isLastOptions ? (
              <OptionsList
                options={message.options || []}
                multi={message.multi}
                step={step}
                selExps={selExps}
                onPickDate={onPickDate}
                onPickGuests={onPickGuests}
                onToggleExp={onToggleExp}
                onSubmitExps={onSubmitExps}
              />
            ) : (
              <div className="text-[10px] text-gray-500 italic px-1">Respondido ✓</div>
            )}
          </div>
        )}

        {/* Results bubble */}
        {message.kind === 'results' && message.results && (
          <div className="space-y-3">
            <div className="bg-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-100">
              {message.text}
            </div>
            <ResultsList 
              results={message.results} 
              navigate={navigate} 
              onRestart={onRestart} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

function OptionsList({ 
  options, 
  multi, 
  step, 
  selExps, 
  onPickDate, 
  onPickGuests, 
  onToggleExp, 
  onSubmitExps 
}: OptionsListProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => {
          const sel = multi && selExps.includes(opt.value);
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => {
                if (step === 'dates') onPickDate(opt.label);
                else if (step === 'guests') onPickGuests(opt.label);
                else if (step === 'experience') onToggleExp(opt.value);
              }}
              className={`text-left p-2.5 rounded-xl border text-xs transition-all duration-200 ${sel ? 'bg-blue-600/25 border-blue-500/60 text-blue-200 shadow-md shadow-blue-500/10' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30 text-gray-300 hover:text-white'}`}
            >
              <div className="flex items-center gap-1.5">
                {Icon && <Icon className={`w-3.5 h-3.5 shrink-0 ${sel ? 'text-blue-400' : 'text-gray-500'}`} />}
                <span className="font-semibold">{opt.label}</span>
              </div>
              {opt.desc && <div className="text-[10px] text-gray-500 mt-0.5 ml-5">{opt.desc}</div>}
            </button>
          );
        })}
      </div>
      {multi && step === 'experience' && (
        <button
          onClick={onSubmitExps}
          disabled={selExps.length === 0}
          className={`mt-2.5 w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${selExps.length > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
        >
          <Sparkles className="w-4 h-4" />
          Buscar mi viaje ideal ({selExps.length})
        </button>
      )}
    </div>
  );
}

function ResultsList({ results, navigate, onRestart }: ResultsListProps) {
  return (
    <>
      <div className="space-y-2.5">
        {results.map((r, i) => (
          <div
            key={i}
            onClick={() => navigate('/destinos')}
            className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-28 h-24 sm:h-auto shrink-0 relative overflow-hidden">
                <img src={r.image} alt={r.resort} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-1.5 left-1.5 bg-black/50 backdrop-blur-sm rounded-lg px-1.5 py-0.5 flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold text-white">{r.rating}</span>
                </div>
              </div>
              <div className="p-3 flex-1 min-w-0 text-left">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{r.resort}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-blue-400 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {r.country}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-blue-400">{r.price_from}</div>
                    <div className="text-[10px] text-gray-500">{r.duration}</div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2">{r.description}</p>
                {r.highlights && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {r.highlights.slice(0, 3).map((h, j) => (
                      <span key={j} className="text-[9px] bg-blue-600/20 text-blue-300 px-1.5 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate('/destinos')}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
        >
          Ver Todos los Destinos
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onRestart}
          className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </>
  );
}

const MONTHS: OptionItem[] = [
  { label: 'Dic 2025', value: 'dic-2025' },
  { label: 'Ene 2026', value: 'ene-2026' },
  { label: 'Feb 2026', value: 'feb-2026' },
  { label: 'Mar 2026', value: 'mar-2026' },
  { label: 'Abr 2026', value: 'abr-2026' },
  { label: 'Flexible', value: 'flexible' },
];

const GUESTS: OptionItem[] = [
  { label: '1 viajero', value: '1', icon: User },
  { label: '2 viajeros', value: '2', icon: Users },
  { label: '3-4', value: '3-4', icon: Users },
  { label: '5+', value: '5+', icon: Users },
  { label: 'Con niños', value: 'kids', icon: Baby },
];

const EXPS: OptionItem[] = [
  { label: 'Principiante', value: 'principiante', icon: Snowflake, desc: 'Primera vez en nieve' },
  { label: 'Avanzado', value: 'avanzado', icon: Mountain, desc: 'Pistas negras y freeride' },
  { label: 'Familia', value: 'familia', icon: Heart, desc: 'Diversión para todos' },
  { label: 'Après-ski', value: 'apres', icon: Wine, desc: 'Fiesta y gastronomía' },
  { label: 'Lujo', value: 'lujo', icon: Star, desc: 'Experiencia 5 estrellas' },
  { label: 'Aventura', value: 'aventura', icon: Zap, desc: 'Adrenalina máxima' },
];

const FALLBACK_RESULTS: ResultItem[] = [
  {
    resort: 'Val Thorens',
    country: 'Francia',
    description: 'La estación más alta de Europa con nieve garantizada y 600km de pistas en Les 3 Vallées.',
    price_from: '$1,890',
    duration: '7 noches',
    highlights: ['Nieve garantizada', 'Après-ski vibrante', '600km pistas'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80',
  },
  {
    resort: 'Zermatt',
    country: 'Suiza',
    description: 'Esquí con vistas al icónico Matterhorn, lujo alpino y pistas de clase mundial.',
    price_from: '$2,450',
    duration: '7 noches',
    highlights: ['Matterhorn', 'Esquí glaciar', 'Pueblo sin coches'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520981825232-ece63a23e7e3?w=600&q=80',
  },
  {
    resort: 'Baqueira Beret',
    country: 'España',
    description: 'El mejor resort de España en el Valle de Arán con gastronomía excepcional.',
    price_from: '$1,290',
    duration: '5 noches',
    highlights: ['Gastronomía', 'Pistas amplias', 'Ambiente exclusivo'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80',
  },
];

type Step = 'origin' | 'dates' | 'guests' | 'experience' | 'loading' | 'results';

export default function AIChatAssistant({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('origin');
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [selExps, setSelExps] = useState<string[]>([]);
  const [answers, setAnswers] = useState({ origin: '', dates: '', guests: '', exp: '' });

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function pushNieve(text: string, kind: ChatMsg['kind'] = 'text', options?: OptionItem[], results?: ResultItem[], multi?: boolean) {
    setMsgs(p => [...p, { id: 'n-' + uid(), from: 'nieve', text, kind, options, results, multi }]);
  }

  function pushUser(text: string) {
    setMsgs(p => [...p, { id: 'u-' + uid(), from: 'user', text, kind: 'text' }]);
  }

  function delay(cb: () => void, ms = 700) {
    setTyping(true);
    setTimeout(() => { setTyping(false); cb(); }, ms);
  }

  useEffect(() => {
    const t1 = setTimeout(() => {
      pushNieve('¡Hola! Soy Nieve, tu asistente de viaje de HolaSki 🎿✨');
    }, 300);
    const t2 = setTimeout(() => {
      pushNieve('¿Desde dónde viajas? Escribe tu ciudad o país ✈️');
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  function submitOrigin() {
    const v = input.trim();
    if (!v) return;
    pushUser(v);
    setAnswers(p => ({ ...p, origin: v }));
    setInput('');
    setStep('dates');
    delay(() => pushNieve('¡Genial! Viajando desde ' + v + ' 📍 ¿Cuándo te gustaría ir?', 'options', MONTHS));
  }

  function pickDate(label: string) {
    pushUser(label);
    setAnswers(p => ({ ...p, dates: label }));
    setStep('guests');
    delay(() => pushNieve('¿Cuántos viajeros son? 👥', 'options', GUESTS));
  }

  function pickGuests(label: string) {
    pushUser(label);
    setAnswers(p => ({ ...p, guests: label }));
    setStep('experience');
    delay(() => pushNieve('¡Casi listo! ¿Qué experiencia buscas? Elige varias ⛷️', 'options', EXPS, undefined, true));
  }

  function toggleExp(val: string) {
    setSelExps(p => p.includes(val) ? p.filter(v => v !== val) : [...p, val]);
  }

  async function submitExps() {
    if (selExps.length === 0) return;
    const labels = selExps.map(v => EXPS.find(e => e.value === v)?.label || v).join(', ');
    pushUser(labels);
    setAnswers(p => ({ ...p, exp: labels }));
    setStep('loading');
    delay(async () => {
      pushNieve('¡Perfecto! Buscando las mejores opciones para ti... 🔍✨');
      await doSearch(labels);
    }, 400);
  }

  async function doSearch(expLabels: string) {
    setTyping(true);
    try {
      const { data, error } = await supabase.functions.invoke('api-handler', {
        body: {
          action: 'ai-trip-assistant',
          origin: answers.origin,
          dates: answers.dates,
          guests: answers.guests,
          experience: expLabels,
        },
      });
      setTyping(false);
      if (error || !data?.results?.length) throw new Error('no results');
      setStep('results');
      pushNieve('🎉 ¡Encontré ' + data.results.length + ' opciones increíbles!', 'results', undefined, data.results);
    } catch (e) {
      console.error('AI search fallback:', e);
      setTyping(false);
      setStep('results');
      pushNieve('🎉 ¡Aquí tienes mis mejores recomendaciones para ' + (answers.origin || 'tu viaje') + '!', 'results', undefined, FALLBACK_RESULTS);
    }
  }

  function restart() {
    setMsgs([]);
    setStep('origin');
    setAnswers({ origin: '', dates: '', guests: '', exp: '' });
    setSelExps([]);
    setInput('');
    setTimeout(() => {
      pushNieve('¡Empecemos de nuevo! 🎿 ¿Desde dónde viajas?');
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 300);
  }

  const STEPS: Step[] = ['origin', 'dates', 'guests', 'experience', 'results'];
  const ci = STEPS.indexOf(step === 'loading' ? 'results' : step);

  function isLastOpts(id: string) {
    const optMsgs = msgs.filter(m => m.from === 'nieve' && m.kind === 'options');
    return optMsgs.length > 0 && optMsgs[optMsgs.length - 1].id === id;
  }

  return (
    <div className="bg-[#0a1929]/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm flex items-center gap-1.5 text-white">
              Nieve
              <span className="text-[10px] bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded-full font-medium">IA</span>
            </div>
            <div className="text-[11px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Tu asistente de viaje
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= ci ? 'bg-blue-500 w-5' : 'bg-white/15 w-2.5'}`} />
            ))}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
        {msgs.map(m => (
          <ChatMessage
            key={m.id}
            message={m}
            isLastOptions={isLastOpts(m.id)}
            step={step}
            selExps={selExps}
            onPickDate={pickDate}
            onPickGuests={pickGuests}
            onToggleExp={toggleExp}
            onSubmitExps={submitExps}
            navigate={navigate}
            onRestart={restart}
          />
        ))}

        {typing && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {step === 'origin' && (
        <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitOrigin()}
                placeholder="Ej: Madrid, Barcelona, México..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
            <button
              onClick={submitOrigin}
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-gray-500 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

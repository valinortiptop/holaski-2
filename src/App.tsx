// @ts-nocheck
// src/App.tsx
import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './lib/supabase';
import { Lang, t } from './lib/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import ResortsPage from './pages/ResortsPage';
import DashboardPage from './pages/DashboardPage';
import AuthModal from './components/AuthModal';

interface AppUser { id: string; email: string; full_name?: string; }
interface Ctx {
  lang: Lang; setLang: (l: Lang) => void; tr: (k: string) => string;
  user: AppUser | null; currency: string; setCurrency: (c: string) => void;
  showAuth: boolean; setShowAuth: (v: boolean) => void;
  authMode: 'login' | 'signup'; setAuthMode: (m: 'login' | 'signup') => void;
}
export const AppContext = createContext<Ctx>({} as Ctx);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [user, setUser] = useState<AppUser | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currency, setCurrency] = useState('USD');
  const tr = (k: string) => t(k, lang);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser({ id: session.user.id, email: session.user.email || '', full_name: session.user.user_metadata?.full_name });
    }).catch(() => {});
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { setUser({ id: session.user.id, email: session.user.email || '', full_name: session.user.user_metadata?.full_name }); setShowAuth(false); }
      else setUser(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ lang, setLang, tr, user, currency, setCurrency, showAuth, setShowAuth, authMode, setAuthMode }}>
      <div className="min-h-screen flex flex-col bg-slate-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
            <Route path="/wizard" element={<ErrorBoundary><WizardPage /></ErrorBoundary>} />
            <Route path="/resorts" element={<ErrorBoundary><ResortsPage /></ErrorBoundary>} />
            <Route path="/dashboard" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
          </Routes>
        </main>
        <Footer />
        {showAuth && <AuthModal />}
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    </AppContext.Provider>
  );
}
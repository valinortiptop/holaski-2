// @ts-nocheck
// src/App.tsx
import { useState, useEffect, createContext, useContext, Component, ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './lib/supabase';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import ResortsPage from './pages/ResortsPage';
import DashboardPage from './pages/DashboardPage';

interface EBProps { children: ReactNode }
interface EBState { hasError: boolean }
class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(p: EBProps) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <p className="text-5xl mb-4">⛷️</p>
        <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
        <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full">Recargar</button>
      </div>
    );
    return this.props.children;
  }
}

export const AppCtx = createContext<any>(null);
export const useApp = () => useContext(AppCtx);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user || null)).catch(() => {});
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user || null);
      if (s?.user) setShowAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppCtx.Provider value={{ user, showAuth, setShowAuth }}>
      <div className="min-h-screen flex flex-col bg-white">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/resorts" element={<ResortsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </ErrorBoundary>
        <Toaster position="top-right" richColors />
      </div>
    </AppCtx.Provider>
  );
}
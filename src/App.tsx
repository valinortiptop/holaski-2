// @ts-nocheck
// src/App.tsx
import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import ResortsPage from './pages/ResortsPage';
import DashboardPage from './pages/DashboardPage';
import AuthModal from './components/AuthModal';

export const AppCtx = createContext<any>(null);
export const useApp = () => useContext(AppCtx);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    }).catch(() => {});
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user || null);
      if (s?.user) setShowAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppCtx.Provider value={{ user, showAuth, setShowAuth }}>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/wizard" element={<WizardPage />} />
              <Route path="/resorts" element={<ResortsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
        {showAuth && <AuthModal />}
        <Toaster position="top-right" richColors />
      </div>
    </AppCtx.Provider>
  );
}
// @ts-nocheck
// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import TripPlannerPage from './pages/TripPlannerPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1628] text-white font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
          <Route path="/destinos" element={<ErrorBoundary><DestinationsPage /></ErrorBoundary>} />
          <Route path="/paquetes" element={<ErrorBoundary><PackagesPage /></ErrorBoundary>} />
          <Route path="/planear" element={<ErrorBoundary><TripPlannerPage /></ErrorBoundary>} />
          <Route path="/contacto" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
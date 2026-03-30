// @ts-nocheck
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DestinationsPage from './pages/DestinationsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import PackagesPage from './pages/PackagesPage';
import TripPlannerPage from './pages/TripPlannerPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1628] text-white font-sans">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
          <Route path="/buscar" element={<ErrorBoundary><SearchPage /></ErrorBoundary>} />
          <Route path="/destinos" element={<ErrorBoundary><DestinationsPage /></ErrorBoundary>} />
          <Route path="/destinos/:id" element={<ErrorBoundary><ResortDetailPage /></ErrorBoundary>} />
          <Route path="/paquetes" element={<ErrorBoundary><PackagesPage /></ErrorBoundary>} />
          <Route path="/planear" element={<ErrorBoundary><TripPlannerPage /></ErrorBoundary>} />
          <Route path="/contacto" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
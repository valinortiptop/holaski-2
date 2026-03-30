// @ts-nocheck
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import DestinationsPage from './pages/DestinationsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import TripPlannerPage from './pages/TripPlannerPage';
import ContactPage from './pages/ContactPage';
import PackagesPage from './pages/PackagesPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1628] text-white">
      <Toaster position="top-right" richColors />
      <Navbar />
      <Routes>
        <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
        <Route path="/buscar" element={<ErrorBoundary><SearchResultsPage /></ErrorBoundary>} />
        <Route path="/destinos" element={<ErrorBoundary><DestinationsPage /></ErrorBoundary>} />
        <Route path="/destinos/:id" element={<ErrorBoundary><ResortDetailPage /></ErrorBoundary>} />
        <Route path="/planear" element={<ErrorBoundary><TripPlannerPage /></ErrorBoundary>} />
        <Route path="/contacto" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
        <Route path="/paquetes" element={<ErrorBoundary><PackagesPage /></ErrorBoundary>} />
      </Routes>
      <Footer />
    </div>
  );
}
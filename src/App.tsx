// @ts-nocheck
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buscar" element={<SearchResultsPage />} />
          <Route path="/destinos" element={<DestinationsPage />} />
          <Route path="/destinos/:id" element={<ResortDetailPage />} />
          <Route path="/planear" element={<TripPlannerPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/paquetes" element={<PackagesPage />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
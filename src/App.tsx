// @ts-nocheck
// src/App.tsx
// @ts-nocheck
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailPage from './pages/ResortDetailPage';
import TripPlannerPage from './pages/TripPlannerPage';
import PlanearViajePage from './pages/PlanearViajePage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Destinations / resorts */}
          <Route path="/resorts" element={<ResortsPage />} />
          <Route path="/destinos" element={<ResortsPage />} />
          <Route path="/explore" element={<ResortsPage />} />
          <Route path="/resorts/:slug" element={<ResortDetailPage />} />
          <Route path="/resort/:slug" element={<ResortDetailPage />} />

          {/* Trip planning */}
          <Route path="/planner" element={<TripPlannerPage />} />
          <Route path="/planear-viaje" element={<PlanearViajePage />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          <Route path="/plan" element={<PlanearViajePage />} />

          {/* Search */}
          <Route path="/buscar" element={<SearchResultsPage />} />

          {/* Catch-all: no more white-screen 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
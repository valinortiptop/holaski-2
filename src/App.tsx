// @ts-nocheck
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinosPage from './pages/DestinosPage';
import PaquetesPage from './pages/PaquetesPage';
import PlanearViajePage from './pages/PlanearViajePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinos" element={<DestinosPage />} />
          <Route path="/paquetes" element={<PaquetesPage />} />
          <Route path="/planear-viaje" element={<PlanearViajePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinosPage from './pages/DestinosPage';
import PaquetesPage from './pages/PaquetesPage';
import PlanearViajePage from './pages/PlanearViajePage';
import ContactoPage from './pages/ContactoPage';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinos" element={<DestinosPage />} />
          <Route path="/paquetes" element={<PaquetesPage />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
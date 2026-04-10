// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinosPage from './pages/DestinosPage';
import PaquetesPage from './pages/PaquetesPage';
import PlanearViajePage from './pages/PlanearViajePage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-navy-950 text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinos" element={<DestinosPage />} />
            <Route path="/paquetes" element={<PaquetesPage />} />
            <Route path="/planear-viaje" element={<PlanearViajePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" expand={true} richColors />
      </div>
    </Router>
  );
}

export default App;
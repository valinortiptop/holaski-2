// @ts-nocheck

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinosPage from './pages/DestinosPage';
import PlanearViajePage from './pages/PlanearViajePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-navy-900 text-slate-100 selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinos" element={<DestinosPage />} />
            <Route path="/planear-viaje" element={<PlanearViajePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
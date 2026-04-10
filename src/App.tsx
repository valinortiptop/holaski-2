// @ts-nocheck

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlanearViajePage from './pages/PlanearViajePage';

function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-blue-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planear-viaje" element={<PlanearViajePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
// @ts-nocheck
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DestinosPage from './pages/DestinosPage';
import TripPlannerPage from './pages/TripPlannerPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos" element={<DestinosPage />} />
        <Route path="/planner" element={<TripPlannerPage />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
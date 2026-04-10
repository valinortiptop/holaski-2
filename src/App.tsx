// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlanearViajePage from './pages/PlanearViajePage';
import DestinosPage from './pages/DestinosPage';

function App() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans selection:bg-blue-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos" element={<DestinosPage />} />
        <Route path="/planear" element={<PlanearViajePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlanearViajePage from './pages/PlanearViajePage';
import PaquetesPage from './pages/PaquetesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-950 font-sans selection:bg-blue-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          <Route path="/paquetes" element={<PaquetesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
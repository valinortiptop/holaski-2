// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlanearViajePage from './pages/PlanearViajePage';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
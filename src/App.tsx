// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TripPlannerPage from './pages/TripPlannerPage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailPage from './pages/ResortDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<TripPlannerPage />} />
        <Route path="/resorts" element={<ResortsPage />} />
        <Route path="/resort/:slug" element={<ResortDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
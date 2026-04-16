// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResortsPage from './pages/ResortsPage';
import ResortDetailsPage from './pages/ResortDetailsPage';
import TripPlannerPage from './pages/TripPlannerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resorts" element={<ResortsPage />} />
            <Route path="/resorts/:slug" element={<ResortDetailsPage />} />
            <Route path="/planner" element={<TripPlannerPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
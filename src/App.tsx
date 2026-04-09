// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlanearViajePage from './pages/PlanearViajePage';

// Placeholder components for missing routes
const HomePlaceholder = () => (
  <div className="min-h-screen pt-32 text-center">
    <h1 className="text-4xl font-bold">Bienvenido a HolaSki</h1>
    <a href="/planear" className="text-blue-400 mt-4 block">Planear mi Viaje</a>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-900 text-slate-200">
        <Routes>
          <Route path="/" element={<HomePlaceholder />} />
          <Route path="/planear" element={<PlanearViajePage />} />
          <Route path="*" element={<HomePlaceholder />} />
        </Routes>
      </div>
    </Router>
  );
}
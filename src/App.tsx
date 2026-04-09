// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlanearViajePage from './pages/PlanearViajePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-900 text-white">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" className="text-2xl font-black tracking-tighter text-blue-500">HOLASKI</a>
            <div className="flex gap-8 font-bold text-sm uppercase tracking-wider">
              <a href="#" className="hover:text-blue-400">Destinos</a>
              <a href="#" className="hover:text-blue-400">Paquetes</a>
              <a href="/planear" className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Planear Viaje</a>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <div className="pt-32 px-4 text-center">
              <h1 className="text-6xl font-black mb-6">EXPLORA EL MUNDO SOBRE ESQUÍS</h1>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Expertos en viajes de nieve personalizados a los mejores destinos del mundo.</p>
              <a href="/planear" className="inline-block bg-blue-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-blue-600/20">
                COMENZAR MI VIAJE
              </a>
            </div>
          } />
          <Route path="/planear" element={<PlanearViajePage />} />
        </Routes>

        <footer className="mt-20 py-12 border-t border-white/5 bg-navy-950">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2024 HolaSki. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
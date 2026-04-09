// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1628]">
      <Navbar />
      <main className="flex-grow pt-20">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-9xl font-black text-white/5">404</h1>
                <h2 className="text-3xl font-bold text-white -mt-12 mb-6">Pagina no encontrada</h2>
                <a href="/" className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-xl shadow-blue-600/20">
                  Volver al inicio
                </a>
              </div>
            } />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

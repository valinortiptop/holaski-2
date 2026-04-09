// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1628] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinos" element={<div className="pt-32 text-center text-white">Próximamente: Página de Destinos</div>} />
            <Route path="/paquetes" element={<div className="pt-32 text-center text-white">Próximamente: Página de Paquetes</div>} />
            <Route path="/planear" element={<div className="pt-32 text-center text-white">Próximamente: Planificador de Viajes</div>} />
            <Route path="/contacto" element={<div className="pt-32 text-center text-white">Próximamente: Contacto</div>} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
```
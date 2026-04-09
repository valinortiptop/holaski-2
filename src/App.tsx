// @ts-nocheck
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PlanearViajePage from './pages/PlanearViajePage'
import PaquetesPage from './pages/PaquetesPage'
import DestinosPage from './pages/DestinosPage'
import DestinoDetailPage from './pages/DestinoDetailPage'
import ContactoPage from './pages/ContactoPage'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1628', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planear" element={<PlanearViajePage />} />
        <Route path="/paquetes" element={<PaquetesPage />} />
        <Route path="/destinos" element={<DestinosPage />} />
        <Route path="/destinos/:slug" element={<DestinoDetailPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
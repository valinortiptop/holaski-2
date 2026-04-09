// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Resorts from './pages/Resorts';
import ResortDetail from './pages/ResortDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/resorts/:slug" element={<ResortDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```
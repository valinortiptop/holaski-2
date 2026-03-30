// @ts-nocheck
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ErrorBoundary>
  );
}
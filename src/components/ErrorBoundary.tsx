// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component<{ children: any }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
            <p className="text-gray-400 mb-6">Ha ocurrido un error inesperado.</p>
            <button onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition">
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
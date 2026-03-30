// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⛷️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Oops! Algo salió mal</h1>
            <p className="text-gray-600 mb-6">Hubo un error inesperado. Por favor recarga la página.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-holaski-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1628] p-4 text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">¡Ups! Algo salió mal.</h2>
            <p className="text-gray-400 mb-6">Estamos trabajando para solucionarlo.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 px-6 py-2 rounded-xl font-bold"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
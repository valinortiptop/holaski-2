import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

// Error reporting service
const reportError = async (error: Error, errorInfo: any) => {
  try {
    // Send error to monitoring service (e.g., Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example implementation - replace with your actual monitoring service
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    }
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error: Error, info: any) { 
    console.error('ErrorBoundary:', error, info);
    // Report error to external monitoring service
    reportError(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-6">⛷️</div>
            <h2 className="text-2xl font-bold mb-3">Algo salió mal</h2>
            <p className="text-white/50 mb-6">Hubo un error inesperado al cargar la sección.</p>
            <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all text-white">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

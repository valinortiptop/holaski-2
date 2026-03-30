// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="text-6xl mb-4">⛷️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Algo salió mal</h2>
          <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl">
            Recargar Página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
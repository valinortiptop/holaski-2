// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
export default class ErrorBoundary extends Component<{children:ReactNode},{hasError:boolean}> {
  constructor(p:any) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <p className="text-5xl mb-4">⛷️</p>
        <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
        <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full">Recargar</button>
      </div>
    );
    return this.props.children;
  }
}
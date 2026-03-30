// @ts-nocheck
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
interface P { children: ReactNode }
interface S { hasError: boolean }
export default class ErrorBoundary extends Component<P, S> {
  constructor(p: P) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-6xl mb-4">⛷️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Algo salió mal</h2>
        <button onClick={() => this.setState({ hasError: false })} className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600">Reintentar</button>
      </div>
    );
    return this.props.children;
  }
}
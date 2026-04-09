// src/lib/currency.ts
export const rates: Record<string, number> = { USD: 1, CLP: 950, ARS: 870, MXN: 17.2, BRL: 5.1, EUR: 0.92, COP: 4100 };
export const symbols: Record<string, string> = { USD: 'US$', CLP: 'CLP$', ARS: 'AR$', MXN: 'MX$', BRL: 'R$', EUR: '€', COP: 'COP$' };
export function convert(usd: number, to: string): number { return Math.round(usd * (rates[to] || 1)); }
export function fmt(usd: number, cur: string): string { return `${symbols[cur] || '$'}${convert(usd, cur).toLocaleString()}`; }
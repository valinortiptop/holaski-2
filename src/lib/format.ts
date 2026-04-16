// @ts-nocheck
// src/lib/format.ts
export const formatMXN = (amount: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);

// Convert USD baseline to approximate MXN (rate ~ 17.5)
export const usdToMxn = (usd: number): number => Math.round(usd * 17.5);
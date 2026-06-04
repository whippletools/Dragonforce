/**
 * Formatea un valor numérico (o string numérico) como moneda mexicana.
 * Si el valor es null/undefined/no-numérico, devuelve "Precio a consultar".
 */
export function formatCurrency(
  value: number | string | null | undefined,
  fallback = 'Precio a consultar',
): string {
  if (value === null || value === undefined || value === '') return fallback
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return n.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  })
}

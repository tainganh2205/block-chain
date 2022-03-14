export function formatCurrency(
  amount: string | number,
  currency = 'USD',
): string {
  return new Intl.NumberFormat('en-VN', { style: 'currency', currency }).format(
    Number(amount),
  )
}

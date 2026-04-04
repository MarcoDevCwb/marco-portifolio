export function calcularSaldo({
  entradas,
  saidas,
}: {
  entradas: number
  saidas: number
}) {
  return entradas - saidas
}
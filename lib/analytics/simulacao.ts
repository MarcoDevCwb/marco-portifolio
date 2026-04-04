import { Divida } from "@/lib/debts/prioridade"

export function simularQuitacao({
  rendaMensal,
  despesasFixas,
  dividas,
}: {
  rendaMensal: number
  despesasFixas: number
  dividas: Divida[]
}) {
  const saldoDisponivel = rendaMensal - despesasFixas

  const totalDividas = dividas.reduce(
    (acc, d) => acc + d.valor_restante,
    0
  )

  if (saldoDisponivel <= 0) {
    return {
      erro: "Sem margem para pagamento",
    }
  }

  const meses = totalDividas / saldoDisponivel

  return {
    totalDividas,
    saldoDisponivel,
    meses: Math.ceil(meses),
  }
}
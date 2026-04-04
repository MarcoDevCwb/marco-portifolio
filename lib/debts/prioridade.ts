export type Divida = {
  id: string
  nome: string
  valor_restante: number
  juros: number
  prioridade_emocional: number // 1 a 5
}

export function calcularPrioridade(divida: Divida) {
  const pesoJuros = divida.juros * 2
  const pesoValor = divida.valor_restante / 100
  const pesoEmocional = divida.prioridade_emocional * 10

  return pesoJuros + pesoValor + pesoEmocional
}
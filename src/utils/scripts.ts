export function stringParaNumero(valorString: string): number {
  // Remove o símbolo de real ("R$")
  const valorSemSimbolo = valorString.replace('R$', '')

  // Remove pontuação
  const valorSemPontuacao = valorSemSimbolo.replace(/,/g, '')

  // Verifica se o valor é negativo
  const ehNegativo = valorSemPontuacao.charAt(0) === '-'

  // Converte para float e aplica o sinal negativo se necessário
  const valorNumerico = parseFloat(
    ehNegativo ? valorSemPontuacao.substring(1) : valorSemPontuacao,
  )

  return valorNumerico
}

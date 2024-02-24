export function stringParaNumero(valorString: string): number {
  // Remove o prefixo "R$" e substitui vírgulas por pontos
  const valorLimpo = valorString
    .replace('R$', '')
    .replace('.', '')
    .replace(',', '.')
  // Converte para número e aplica o multiplicador
  const numero = parseFloat(valorLimpo)
  return numero
}

export function converterNome(nomeCompleto: string): string {
  // Divide o nome completo em partes
  const partes = nomeCompleto.split(' ')

  // Pega o primeiro nome
  const primeiroNome = partes[0]

  // Cria uma string de asteriscos com o mesmo comprimento do restante do nome
  const resto = '*'.repeat(nomeCompleto.length - primeiroNome.length)

  // Retorna o primeiro nome seguido pelo restante substituído por asteriscos
  return primeiroNome + resto
}

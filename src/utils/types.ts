import type { PropDetailType } from '@/types/DBTProps'

export const Registers = Object.freeze({
  A: {
    props: {
      150: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Combo de Remessa',
          start: 2,
          end: 2,
        },
        {
          name: 'Combo do Convênio',
          start: 3,
          end: 22,
        },
        {
          name: 'Nome da Empresa',
          start: 23,
          end: 42,
        },
        {
          name: 'Código do Banco',
          start: 43,
          end: 45,
        },
        {
          name: 'Nome do Banco',
          start: 46,
          end: 65,
        },
        {
          name: 'Data de Geração',
          start: 66,
          end: 73,
        },
        {
          name: 'Número Sequencial do Saldo',
          start: 74,
          end: 79,
        },
        {
          name: 'Versão do Layout',
          start: 80,
          end: 81,
        },
        {
          name: 'Identificação do Serviço',
          start: 82,
          end: 98,
        },
        {
          name: 'Reservado para o futuro',
          start: 99,
          end: 150,
        },
      ],
    },
  },
  // B: {
  //   props:{ }
  // },
  E: {
    props: {
      150: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Id Cliente na Empresa',
          start: 2,
          end: 26,
        },
        {
          name: 'Agência para Débito',
          start: 27,
          end: 30,
        },
        {
          name: 'Id Cliente no Banco',
          start: 31,
          end: 44,
        },
        {
          name: 'Data do Vencimento',
          start: 45,
          end: 52,
        },
        {
          name: 'Valor do Débito',
          start: 53,
          end: 67,
        },
        {
          name: 'Código da Moeda',
          start: 68,
          end: 69,
        },
        {
          name: 'Código do Plano',
          start: 70,
          end: 77,
        },
        {
          name: 'Número da Parcela',
          start: 78,
          end: 81,
        },
        {
          name: 'Quantidade de Parcelas',
          start: 82,
          end: 85,
        },
        {
          name: 'Identificador da Cobrança',
          start: 86,
          end: 95,
        },
        {
          name: 'Id do Título',
          start: 96,
          end: 105,
        },
        {
          name: 'Valor da Parcela Recente',
          start: 106,
          end: 113,
        },
        {
          name: 'Convênio',
          start: 114,
          end: 118,
        },
        {
          name: 'Filler',
          start: 119,
          end: 129,
        },
        {
          name: 'Reservado para o futuro',
          start: 130,
          end: 149,
        },
        {
          name: 'Código do Movimento',
          start: 150,
          end: 150,
        },
      ],
    },
  },
  F: {
    props: {
      150: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Id Cliente na Empresa',
          start: 2,
          end: 26,
        },
        {
          name: 'Agência para Débito',
          start: 27,
          end: 30,
        },
        {
          name: 'Id Cliente no Banco',
          start: 31,
          end: 44,
        },
        {
          name: 'Data do Vencimento',
          start: 45,
          end: 52,
        },
        {
          name: 'Valor Original',
          start: 53,
          end: 67,
        },
        {
          name: 'Código do Retorno',
          start: 68,
          end: 69,
        },
        {
          name: 'Uso da Empresa',
          start: 70,
          end: 139,
        },
        {
          name: 'Reservado para o futuro',
          start: 140,
          end: 149,
        },
        {
          name: 'Código do Movimento',
          start: 150,
          end: 150,
        },
      ],
    },
  },
  H: {
    props: {
      9: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Tipo do arquivo de retorno',
          start: 2,
          end: 9,
        },
      ],
    },
  },
  R: {
    props: {
      171: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Código de identificação do título',
          start: 2,
          end: 11,
        },
        {
          name: 'Número da parcela de referência',
          start: 12,
          end: 14,
        },
        {
          name: 'Código do tipo de registro',
          start: 15,
          end: 17,
        },
        {
          name: 'Código do tipo de recusa',
          start: 18,
          end: 21,
        },
        {
          name: 'Descrição do tipo de recusa',
          start: 22,
          end: 121,
        },
        {
          name: 'Data da Queda',
          start: 122,
          end: 129,
        },
        {
          name: 'Data prevista de crédito/débito',
          start: 130,
          end: 137,
        },
        {
          name: 'Data do evento',
          start: 138,
          end: 145,
        },
        {
          name: 'Valor do crédito',
          start: 146,
          end: 156,
        },
        {
          name: 'Código de referência',
          start: 157,
          end: 171,
        },
      ],
    },
  },
  Z: {
    props: {
      6: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Quantidade de registros do arquivo',
          start: 2,
          end: 6,
        },
      ],
      9: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Quantidade de registros do arquivo',
          start: 2,
          end: 9,
        },
      ],
      150: [
        {
          name: 'Tipo de registro do arquivo',
          start: 1,
          end: 1,
        },
        {
          name: 'Total de registros do arquivo',
          start: 2,
          end: 7,
        },
        {
          name: 'Valor dos registros',
          start: 8,
          end: 24,
        },
        {
          name: 'Reservado para o futuro',
          start: 25,
          end: 150,
        },
      ],
    },
  },
})

export const enginerSearch = (column: string) => {
  const typeColumn = column[0] as keyof typeof Registers

  if (!Registers[typeColumn]) {
    alert("Tipo não encontrado: Linha de tipo " + typeColumn)
    return [typeColumn, []]
  }

  const propsColumn = Registers[typeColumn].props
  const columnSize = column.length as keyof typeof propsColumn

  let result: PropDetailType[] | undefined = propsColumn[columnSize]

  if (result) return [typeColumn, result]

  result = Object.entries(propsColumn).find(([len]) => Number(len) >= columnSize)?.[1]
  if (result) return [typeColumn, result]
  console.info('Resultado não encontrado, tentando usar o maior!', typeColumn, propsColumn)
  result = Object.values(propsColumn).at(-1)
  if (result) return [typeColumn, result]
  console.info('Nenhum tipo encontrado!', typeColumn)
  return [typeColumn, []]
}

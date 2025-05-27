export const Registers = Object.freeze({
  A: {
    props: {
      150: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Combo de Remessa",
          start: 2,
          end: 2
        },
        {
          name: "Combo do Convenio",
          start: 3,
          end: 22
        },
        {
          name: "Nome da Empresa",
          start: 23,
          end: 42
        },
        {
          name: "Codigo do Banco",
          start: 43,
          end: 45
        },
        {
          name: "Nome do Banco",
          start: 46,
          end: 65
        },
        {
          name: "Data de Geraçào",
          start: 66,
          end: 73
        },
        {
          name: "Numero Sequenc saldo",
          start: 74,
          end: 79
        },
        {
          name: "Versão do layout",
          start: 80,
          end: 81
        },
        {
          name: "Identificação do Serviço",
          start: 82,
          end: 98
        },
        {
          name: "Reservado parao futuro 099",
          start: 99,
          end: 150
        }
      ]
    }
  },
  // B: {
  //   props:{ }
  // },
  E: {
    props: {
      150: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "IdClientenaEmpresa",
          start: 2,
          end: 26
        },
        {
          name: "Agência para Débito",
          start: 27,
          end: 30
        },
        {
          name: "IdClientenoBanco",
          start: 31,
          end: 44
        },
        {
          name: "Datado Vencimento",
          start: 45,
          end: 52
        },
        {
          name: "Valor do Débito",
          start: 53,
          end: 67
        },
        {
          name: "Código da moeda",
          start: 68,
          end: 69
        },
        {
          name: "Códigodo Plano",
          start: 70,
          end: 77
        },
        {
          name: "Número Parcela",
          start: 78,
          end: 81
        },
        {
          name: "Quantidade Parcelas",
          start: 82,
          end: 85
        },
        {
          name: "Identificador Cobrança",
          start: 86,
          end: 95
        },
        {
          name: "Id_titulo",
          start: 96,
          end: 105
        },
        {
          name: "Valor Parcela Recente",
          start: 106,
          end: 113
        },
        {
          name: "Convenio",
          start: 114,
          end: 118
        },
        {
          name: "Filler",
          start: 119,
          end: 129
        },
        {
          name: "Reservado para o futuro",
          start: 130,
          end: 149
        },
        {
          name: "Código do Movimento",
          start: 150,
          end: 150
        }
      ]
    }
  },
  H: {
    props: {
      9: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Tipo do arquivo de retorno",
          start: 2,
          end: 9
        }
      ]
    }
  },
  R: {
    props: {
      171: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Código de identificação do título",
          start: 2,
          end: 11
        },
        {
          name: "Numero da parcela de referencia",
          start: 12,
          end: 14
        },
        {
          name: "Código do tipo de registro",
          start: 15,
          end: 17
        },
        {
          name: "Código tipo de recusa",
          start: 18,
          end: 21
        },
        {
          name: "Descrição tipo de recusa",
          start: 22,
          end: 121
        },
        {
          name: "Data da queda",
          start: 122,
          end: 129
        },
        {
          name: "Data prevista de crédito / débito",
          start: 130,
          end: 137
        },
        {
          name: "Data do evento",
          start: 138,
          end: 145
        },
        {
          name: "Valor do crédito",
          start: 146,
          end: 156
        },
        {
          name: "Código de referencia",
          start: 157,
          end: 171
        }
      ]
    }
  },
  Z: {
    props: {
      6: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Quantidade de registros do arquivo",
          start: 2,
          end: 6
        }
      ],
      9: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Quantidade de registros do arquivo",
          start: 2,
          end: 9
        }
      ],
      150: [
        {
          name: "Tipo de registro do arquivo",
          start: 1,
          end: 1
        },
        {
          name: "Total de registros do arquivo",
          start: 2,
          end: 7
        },
        {
          name: "Valor registros",
          start: 8,
          end: 24
        },
        {
          name: "fiituro",
          start: 25,
          end: 150
        }
      ]
    }
  }
});

export const enginerSearch = (column) => {
  const type = column.at(0);
  const columnSize = column.length;
  let result = Registers[type].props[columnSize];

  if (result) return [type, result];
  result = Object.entries(Registers[type].props)
    .find(([len, _data]) => len >= columnSize)?.[1];
  if (result) return [type, result];
  console.info("Resultado não encontrado, tentando usar o maior!", type, Registers[type].props)
  result = Object.values(Registers[type].props).at(-1);
  if (result) return [type, result];
  console.info("Nenhum tipo encontrado!", type);
  return [type, []];
};

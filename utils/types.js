export const Registers = Object.freeze({
  // A: {
  //   props:{ }
  // },
  // B: {
  //   props:{ }
  // },
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
  return [type, result];
};

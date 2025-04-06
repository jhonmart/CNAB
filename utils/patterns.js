export function varNamePattern(name) {
  if(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(name))
    return name;
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(/\W+/).map((word, index) =>
      index
        ? word.at(0).toUpperCase() + word.slice(1)
        : word.toLowerCase()
    ).join("");
}

export function fieldGetJS({ row_props, row_name }) {
  const fields = row_props.map((propDetail) => {
    const newVarName = varNamePattern(propDetail.name);

    const varName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(newVarName)
      ? newVarName
      : `[\'${propDetail.name}\']`;

    return `const ${varName} = row.slice(${propDetail.start - 1}, ${propDetail.end});`;
  }).join('\n');
  return `/** Registro: ${row_name} **/\n${fields}\n\n`;
}

export function formatProp(prop) {
  return {
    name: prop[0],
    start: Number(prop[1]),
    end: Number(prop[1]) + Number(prop[2]) - 1,
  };
}

export function dbtItem(list, currentType) {
  return {
    id: list.length,
    row_type: currentType,
    row_name: `Tipo ${currentType}`,
    row_props: [],
    row_draft: {
      name: "",
      start: undefined,
      end: undefined,
    }
  }
}

export function syntaxJSON(data) {
  const json = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+\.?\d*\b)/g, match => {
    let cls = 'number-type';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'key' : 'string';
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

export function syntaxJS(data) {
  return data
    // Strings
    .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, match => `<span class="string">${match}</span>`)
    // Comentários do tipo /** */
    .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
    // Propriedade (ex: row.x)
    .replace(/ (\w+)\.(\w+)/g, ' <span class="key">$1</span>.$2')
    // slice como função
    .replace(/\bslice\b/g, '<span class="function-slice">slice</span>')
    // Operadores de atribuição
    .replace(/ = /g, '<span class="operator"> = </span>')
    // Booleanos
    .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>')
    // Números
    .replace(/\b\d+(\.\d+)?\b/g, '<span class="number-type">$&</span>')
    // Nome variavel (ex: let name)
    .replace(/\b(const|let|var)\b (\w+)/g, '$1 <span class="st-name">$2</span>')
    // Palavras-chave (ex: const)
    .replace(/\b(const|let|var)\b/g, '<span class="keyword">$1</span>')
    // Chaves { }
    .replace(/([{}])/g, '<span class="brace">$1</span>')
    // Colchetes [ ]
    .replace(/([\[\]])/g, '<span class="bracket">$1</span>')
    // Parenteses ( )
    .replace(/([\(\)])/g, '<span class="parentheses">$1</span>');
}

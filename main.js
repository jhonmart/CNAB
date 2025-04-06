var app = new Vue({
  el: '#app',
  data: {
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    dbtFileContent: "",
    dbtJSON: "",
    dbtJS: "",
    jsMode: false,
    columns: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'row_type',
        label: 'Tipo',
      },
      {
        field: 'row_name',
        label: 'Nome',
      },
    ],
    propsColumns: [
      {
        field: 'name',
        label: 'Nome',
        sortable: true
      },
      {
        field: 'start',
        label: 'Inicio',
        sortable: true
      },
      {
        field: 'end',
        label: 'Fim',
        sortable: true
      },
    ],
    lastOpen: 1,
    propSelected: {},
    isCardModalActive: false
  },
  computed: {
    rowsFile() {
      return this.dbtFileContent
        .replaceAll('\r', '')
        .split("\n");
    },
    dbtData() {
      if (!this.dbtFileContent.trim().length) return [];
      const itens = this.rowsFile.reduce((list, actualRow) => {
        const currentType = actualRow.at(0);
        if (!list[0].types.includes(currentType)) {
          const item = {
            id: list.length,
            row_type: currentType,
            row_name: `Tipo ${currentType}`,
            row_props: [],
            row_draft: {
              name: "",
              start: undefined,
              end: undefined,
            }
          };
          list[0].types.push(currentType);
          list.push(item);
        }
        return list;
      }, [{ types: [] }]);

      return itens.slice(1);
    },
    syntaxHighlightJSON() {
      const json = this.dbtJSON.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
    },
    syntaxHighlightJS() {
      return this.dbtJS
        // Strings
        .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, match => `<span class="string">${match}</span>`)
        // Comentários do tipo /** */
        .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        // slice como função
        .replace(/\bslice\b/g, '<span class="function-slice">slice</span>')
        // Operadores de atribuição
        .replace(/ = /g, '<span class="operator"> = </span>')
        // Booleanos
        .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>')
        // Números
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="number-type">$&</span>')
        // Palavras-chave (ex: const)
        .replace(/\b(const|let|var)\b/g, '<span class="keyword">$1</span>')
        // Chaves { }
        .replace(/([{}])/g, '<span class="brace">$1</span>')
        // Colchetes [ ]
        .replace(/([\[\]])/g, '<span class="bracket">$1</span>');
    }
  },
  watch: {
    dbtData: {
      handler() {
        this.updateJSON();
      },
      deep: true
    }
  },
  methods: {
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    resetNewProp({ row_draft }) {
      row_draft.name = "";
      row_draft.start = undefined;
      row_draft.end = undefined;
    },
    addProp({ row_draft, row_props }) {
      row_props.push(this.deepClone(row_draft));
      this.resetNewProp(row_draft);
      this.updateJSON();
    },
    getValue({ row_type, row_draft }) {
      if (row_draft?.start && row_draft?.end)
        return this.rowsFile
          .find(row => row.at(0) === row_type)
          .slice(row_draft.start - 1, row_draft.end);
      return "";
    },
    fieldProps({ row_props }) {
      return row_props.map((prop) => ({
        field: prop.name,
        label: prop.name,
        searchable: true,
        sortable: true
      }));
    },
    fieldValues({ row_props, row_type }, jsVarName=false) {
      return this.rowsFile
        .filter(row => row.at(0) === row_type)
        .reduce((list, currentRow) => {
          const fields = {};
          row_props.forEach((propDetail) => {
            const varNamePattern = jsVarName
              ? this.varNamePattern(propDetail.name)
              : propDetail.name;

            fields[varNamePattern] = currentRow.slice(propDetail.start - 1, propDetail.end);
          });
          list.push(fields);
          return list;
        }, []);
    },
    varNamePattern(name) {
      return name
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .split(/\W+/).map((word, index) => 
          index 
            ? word.at(0).toUpperCase() + word.slice(1)
            : word.toLowerCase()
        ).join("");
    },
    fieldGetJS({ row_props, row_name }) {
      const fields = row_props.map((propDetail) => {
        const newVarName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(propDetail.name)
          ? propDetail.name
          : this.varNamePattern(propDetail.name);

        const varName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(newVarName)
          ? newVarName
          : `[\'${propDetail.name}\']`;

        return `const ${varName} = row.slice(${propDetail.start - 1}, ${propDetail.end});`;
      }).join('\n');
      return `/** Registro: ${row_name} **/\n${fields}\n\n`;
    },
    openProp(row) {
      if (!row?.row_props.length) {
        return this.$buefy.toast.open({
          duration: 5000,
          message: `Adicione propriedades antes de visualizar`,
          type: 'is-link',
          pauseOnHover: true,
          type: 'is-warning'
        });
      }
      this.propSelected = row;
      this.isCardModalActive = true;
    },
    formatProp(prop) {
      return {
        name: prop[0],
        start: Number(prop[1]),
        end: Number(prop[1]) + Number(prop[2]) - 1,
      };
    },
    generateProps(event, { row_props }) {
      event.preventDefault();
      const text = (event.clipboardData || window.clipboardData).getData('text');
      const rowsColumns = text.trim()
        .replaceAll('\r', '')
        .split('\n')
        .map(row => row.split('\t'))
        .map(this.formatProp);

      row_props.push(...rowsColumns);
      this.updateJSON();
    },
    dbtContent(event) {
      event.preventDefault();
      const text = (event.clipboardData || window.clipboardData).getData('text');

      this.dbtFileContent = text;
    },
    updateJS() {
      this.dbtJS = this.dbtData
        .map(this.fieldGetJS)
        .reduce((string, current) => string + current, "");
    },
    updateJSON() {
      const details = this.dbtData
        .map(row => this.fieldValues(row, true))
        .reduce((list, current) => list.concat(current), []);

      this.dbtJSON = JSON.stringify(details, null, 2);
      this.updateJS();
    }
  },
});
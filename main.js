import { syntaxDBT, syntaxJS, syntaxJSON } from "./utils/syntax.js";
import { varNamePattern, fieldGetJS, formatProp, dbtItem } from "./utils/patterns.js";
import { clipboardData, handleTooltipFollowMouse } from "./utils/catch.js";
import { dbtColumns, propsColumns, testPattern } from "./utils/constants.js";
import { deepClone, resetNewProp } from "./utils/tools.js";

new Vue({
  el: '#app',
  data: {
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    dbtFileContent: "",
    dbtJSON: "",
    dbtJS: "",
    dbtText: "",
    testPattern,
    jsMode: false,
    dbtColumns,
    propsColumns,
    lastOpen: 1,
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
          list[0].types.push(currentType);
          list.push(dbtItem(list, currentType));
        }
        return list;
      }, [{ types: [] }]);

      return itens.slice(1);
    },
    syntaxHighlightJSON() {
      return syntaxJSON(this.dbtJSON);
    },
    syntaxHighlightJS() {
      return syntaxJS(this.dbtJS);
    }
  },
  methods: {
    resetNewProp,
    addProp({ row_draft, row_props }) {
      row_props.push(deepClone(row_draft));
      this.resetNewProp({ row_draft });
      this.updateJSON();
    },
    getValue({ row_type, row_draft }) {
      if (row_draft?.start && row_draft?.end)
        return this.rowsFile
          .find(row => row.at(0) === row_type)
          .slice(row_draft.start - 1, row_draft.end);
      return "";
    },
    fieldValues({ row_props, row_type }, raw=false) {
      return this.rowsFile
        .filter(row => row.at(0) === row_type)
        .reduce((list, currentRow) => {
          const fields = {};
          row_props.forEach((propDetail) => {
            fields[raw ? propDetail.name : varNamePattern(propDetail.name)] = currentRow.slice(propDetail.start - 1, propDetail.end);
          });
          list.push(fields);
          return list;
        }, []);
    },
    generateProps(event, { row_props }) {
      const rowsColumns = clipboardData(event).trim()
        .replaceAll('\r', '')
        .split('\n')
        .map(row => row.split('\t'))
        .map(formatProp);

      row_props.push(...rowsColumns);
      this.updateJSON();
    },
    dbtContent(event) {
      const dbtDataContent = clipboardData(event);

      if (dbtDataContent.includes(testPattern)) this.dbtTeste(dbtDataContent);
      else this.dbtFileContent = clipboardData(event);
    },
    updateJS() {
      this.dbtJS = this.dbtData
        .map(fieldGetJS)
        .reduce((string, current) => string + current, "");
    },
    updateDBT() {
      const groups = this.dbtData
        .map(row => this.fieldValues(row, true));

      this.dbtText = syntaxDBT(groups);
      this.$nextTick(handleTooltipFollowMouse);
    },
    updateJSON() {
      const details = this.dbtData
        .map(this.fieldValues)
        .reduce((list, current) => list.concat(current), []);

      this.dbtJSON = JSON.stringify(details, null, 2);
      this.updateJS();
      this.updateDBT();
    },
    dbtTeste(contentTeste) {
      const blocks = contentTeste.split(testPattern);

      this.dbtFileContent = blocks[0];
      this.dbtData.forEach(({ row_props }, index) => {
        const rowsColumns = blocks[index + 1].trim()
          .replaceAll('\r', '')
          .split('\n')
          .map(row => row.split('\t'))
          .map(formatProp);

          row_props.push(...rowsColumns);
      });

      this.updateJSON();
    }
  },
});

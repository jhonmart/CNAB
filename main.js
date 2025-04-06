import { syntaxJS, syntaxJSON } from "./utils/syntax.js";
import { varNamePattern, fieldGetJS, formatProp, dbtItem } from "./utils/patterns.js";
import { clipboardData } from "./utils/catch.js";
import { dbtColumns, propsColumns } from "./utils/constants.js";
import { deepClone, resetNewProp } from "./utils/tools.js";

new Vue({
  el: '#app',
  data: {
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    dbtFileContent: "",
    dbtJSON: "",
    dbtJS: "",
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
    fieldValues({ row_props, row_type }) {
      return this.rowsFile
        .filter(row => row.at(0) === row_type)
        .reduce((list, currentRow) => {
          const fields = {};
          row_props.forEach((propDetail) => {
            fields[varNamePattern(propDetail.name)] = currentRow.slice(propDetail.start - 1, propDetail.end);
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
      this.dbtFileContent = clipboardData(event);
    },
    updateJS() {
      this.dbtJS = this.dbtData
        .map(fieldGetJS)
        .reduce((string, current) => string + current, "");
    },
    updateJSON() {
      const details = this.dbtData
        .map(this.fieldValues)
        .reduce((list, current) => list.concat(current), []);

      this.dbtJSON = JSON.stringify(details, null, 2);
      this.updateJS();
    }
  },
});

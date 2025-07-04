<template>
  <pre class="output-data unique-row">
    <template v-for="(blocks, block_key) in blockPadronize" :key="`block_${block_key}`">
      <span class="comment">{{ blocks.name }}</span>
      <div v-for="(propDetail, prop_key) in blocks.items" :key="`prop_${prop_key}`">
        <span class="keyword">const </span>
        <span class="st-name">{{ propDetail.name }}</span>
        <span class="operator"> = </span>
        <span class="key">row</span>.<span class="function-slice">slice</span><span class="parentheses">(</span><span class="number-type">{{ propDetail.start - 1 }}</span>, <span class="number-type">{{ propDetail.end - 1 }}</span><span class="parentheses">)</span>;
      </div>
      <br>
    </template>
  </pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { state } from '../stories/dbt.ts'
import { varNamePattern } from '../utils/patterns.ts'

function padronizeRow(propDetail) {
  const newVarName = varNamePattern(propDetail.name)
  const newName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(newVarName)
    ? newVarName
    : `[\'${propDetail.name}\']`

  return {
    ...propDetail,
    name: newName,
  }
}

function padronizeBlock({ row_name, row_props }) {
  return {
    name: `/** Registro: ${row_name} **/`,
    items: row_props.map(padronizeRow),
  }
}

const blockPadronize = computed(() => {
  return state.dbtDataObject.map(padronizeBlock)
})
</script>

<style scoped>
/* JS */
.key {
  color: #9cdcfe;
}
.string {
  color: #ce9178;
}
.number-type {
  color: #b5cea8;
}
.keyword {
  color: #c586c0;
}
.operator {
  color: #d4d4d4;
}
.brace {
  color: #dcdcaa;
}
.bracket {
  color: #dcdcaa;
}
.parentheses {
  color: #ffd700;
}
.st-name {
  color: #4fc1ff;
} /** Variable name **/
.function-slice {
  color: #ccbf84;
  font-weight: bold;
}
.comment {
  color: #6a9955;
  font-style: italic;
}
</style>

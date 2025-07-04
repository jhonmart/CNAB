<template>
  <pre class="output-data"><span v-html="syntaxText"></span></pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { syntaxDBT } from '../utils/syntax.ts'
import { varNamePattern } from '../utils/patterns.ts'
import { getRowsFile, state } from '../stories/dbt.ts'

function fieldValues({ row_props, row_type }, raw = false) {
  return getRowsFile.value
    .filter((row) => row.at(0) === row_type)
    .reduce((list, currentRow) => {
      const fields = {}
      row_props.forEach((propDetail) => {
        fields[raw ? propDetail.name : varNamePattern(propDetail.name)] = currentRow.slice(
          propDetail.start - 1,
          propDetail.end,
        )
      })
      list.push(fields)
      return list
    }, [])
}

const syntaxText = computed(() => {
  const groups = state.dbtDataObject.map((row) => fieldValues(row, true))
  return syntaxDBT(groups, state.dbtDataObject)
})
</script>

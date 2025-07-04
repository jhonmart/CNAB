<template>
  <b-field label="DBT dados" label-position="on-border" class="mt-5">
    <b-input
      maxlength="0"
      type="text"
      placeholder="Cole o conteúdo do DBT AQUI"
      v-on:paste="dbtCopyContentPaste"
    />
  </b-field>
</template>

<script setup lang="ts">
import { formatProp } from '../utils/patterns.ts'
import { clipboardData } from '../utils/catch.ts'
import { testPattern } from '../utils/constants.ts'
import { state } from '../stories/dbt.ts'

function dbtPatternComplete(pasteContent) {
  const blocks = pasteContent.split(testPattern)
  state.dbtContent = blocks[0]
  state.dbtDataObject.forEach(({ row_props }, index) => {
    const rowsColumns = blocks[index + 1]
      .trim()
      .replaceAll('\r', '')
      .split('\n')
      .map((row) => row.split('\t'))
      .map(formatProp)
    row_props.push(...rowsColumns)
  })
}

function dbtCopyContentPaste(event) {
  const pasteContent = clipboardData(event).trim()
  if (pasteContent.includes(testPattern)) dbtPatternComplete(pasteContent)
  else {
    state.dbtContent = pasteContent
  }
}
</script>

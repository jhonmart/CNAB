<template>
  <pre class="output-data"><span v-html="syntaxHighlightJSON"></span></pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getDbtJson } from '../stories/dbt.ts'

const syntaxHighlightJSON = computed(() => {
  const json = (getDbtJson.value || '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+\.?\d*\b)/g,
    (match) => {
      let cls = 'number-type'
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'key' : 'string'
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (/null/.test(match)) {
        cls = 'null'
      }
      return `<span class="${cls}">${match}</span>`
    },
  )
})
</script>

<style>
/* JSON */
.key {
  color: #9cdcfe;
}
.string {
  color: #ce9178;
}
.number-type {
  color: #b5cea8;
}
.boolean {
  color: #569cd6;
}
.null {
  color: #dcdcaa;
}
</style>

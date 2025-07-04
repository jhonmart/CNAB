<template>
  <main>
    <HeadRow />
    <DBTInput />

    <template v-if="state.dbtDataObject.length">
      <TableDetailFormat />

      <b-tabs>
        <b-tab-item label="DBT Search" icon="text-box-search">
          <DBTText />
        </b-tab-item>
        <b-tab-item label="JSON" icon="code-json">
          <JSONCode />
        </b-tab-item>
        <b-tab-item label="JavaScript" icon="nodejs">
          <JavaScriptCode />
        </b-tab-item>
      </b-tabs>
    </template>
  </main>
</template>

<script setup lang="ts">
import HeadRow from '../components/HeadRow.vue'
import DBTText from '../components/DBTText.vue'
import DBTInput from '../components/DBTInput.vue'
import JSONCode from '../components/JSONCode.vue'
import JavaScriptCode from '../components/JavaScriptCode.vue'
import TableDetailFormat from '../components/TableDetailFormat.vue'

import { state } from '../stories/dbt.ts'
</script>

<style scoped>
main {
  padding: 15px;
}
</style>

<style>
@import '../assets/dbt-rules.css';
</style>

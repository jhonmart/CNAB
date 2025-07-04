<template>
  <b-table :data="state.dbtDataObject" :columns="dbtColumns" detailed @details-open="clearProp">
    <template #empty>
      <div class="is-flex is-justify-content-center has-text-weight-semibold">
        <b-icon icon="text-search" class="mr-1"></b-icon>
        Sem Informações
      </div>
    </template>

    <template #detail="{ row }">
      <section>
        <b-field label="Cole o template aqui" label-position="on-border">
          <b-input
            maxlength="0"
            type="text"
            placeholder="NOME | INICIO | TAMANHO"
            v-on:paste="(event) => generateProps(event, row)"
          />
        </b-field>
        <hr />
        <b-field label="Nova propriedade" grouped label-position="on-border" class="form-new-prop">
          <b-input placeholder="Nome" type="search" v-model="row.row_draft.name"></b-input>
          <b-input placeholder="Inicia em" type="number" v-model="row.row_draft.start"></b-input>
          <b-input placeholder="Termina em" type="number" v-model="row.row_draft.end"></b-input>
          <b-input placeholder="Valor" disabled></b-input>
          <p class="control">
            <b-button class="button is-primary is-full" icon-left="plus" @click="addProp(row)"
              >Adicionar</b-button
            >
          </p>
        </b-field>
        <p class="title is-6">Detalhe das propriedades:</p>
        <b-table :data="row.row_props" paginated per-page="15" narrowed>
          <b-table-column field="name" label="Nome" sortable v-slot="{ row, index }">
            <b-field :message="checkColumnMsg(index)">
              <b-input
                placeholder="Nome"
                type="search"
                v-model="row.name"
                :disabled="index === 0"
                class="column"
                :title="checkColumnMsg(index)"
              ></b-input>
            </b-field>
          </b-table-column>
          <b-table-column field="start" label="Inicio" numeric sortable v-slot="{ row }">
            <div class="column">{{ row.start }}</div>
          </b-table-column>
          <b-table-column field="end" label="Fim" numeric sortable v-slot="{ row }">
            <div class="column">{{ row.end }}</div>
          </b-table-column>
          <b-table-column field="end" label="Ações" v-slot="{ row: child }">
            <div class="column">
              <b-button @click="removeColumn(row, child)" type="is-danger" class="is-full"
                >Excluir</b-button
              >
            </div>
          </b-table-column>
        </b-table>
      </section>
    </template>
  </b-table>
</template>

<script setup lang="ts">
import { clipboardData } from '../utils/catch.ts'
import { dbtColumns } from '../utils/constants.ts'
import { deepClone, resetNewProp } from '../utils/tools.ts'
import { formatProp } from '../utils/patterns.ts'
import { state } from '../stories/dbt.ts'
import { ToastProgrammatic as Toast } from 'buefy'
import type { DataObjectDBTType, PropDetailType } from '@/types/DBTProps.ts'

function clearProp(args) {
  resetNewProp(args)
}

function addProp({ row_draft, row_props }) {
  row_props.push(deepClone(row_draft))
  clearProp({ row_draft })
}

function generateProps(event: ClipboardEvent, { row_props }: DataObjectDBTType) {
  const rowsColumns = clipboardData(event)
    .trim()
    .replaceAll('\r', '')
    .split('\n')
    .map((row: string) => row.split('\t'))
    .map(formatProp)
  row_props.push(...rowsColumns)
}

function removeColumn(row: DataObjectDBTType, child: PropDetailType) {
  const result = row.row_props.some(({ start: startColumn }: { start: number }, index: number) => {
    if (child.start === startColumn) {
      row.row_props.splice(index, 1)
      return true
    }
  })
  if (!result) Toast.open('Falha ao tentar apagar item: ' + child.name + '!')
}

function checkColumnMsg(index) {
  return index === 0 ? 'Primeira coluna somente para definir o tipo' : ''
}
</script>

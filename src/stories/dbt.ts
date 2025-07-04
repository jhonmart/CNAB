import { reactive, computed, watch } from 'vue'
import { dbtItem, varNamePattern } from '../utils/patterns.ts'
import { enginerSearch } from '../utils/types.ts'
import type { DataObjectDBTType, PropDetailType } from '@/types/DBTProps.ts'

const state = reactive({
  dbtContent: '',
  dbtDataObject: [] as DataObjectDBTType[],
})

function setContent(newValue: string) {
  state.dbtContent = newValue
}

const getRowsFile = computed(() => {
  return state.dbtContent.replace(/\r/g, '').split('\n')
})

type ObjectString = { [key: string]: string }

function fieldValues({ row_props, row_type }: DataObjectDBTType, raw = false) {
  return getRowsFile.value
    .filter((row) => row[0] === row_type)
    .reduce((list: ObjectString[], currentRow) => {
      const fields: ObjectString = {}
      row_props.forEach((propDetail: PropDetailType) => {
        const key = raw ? propDetail.name : varNamePattern(propDetail.name)
        if (typeof propDetail?.end === 'undefined' || typeof propDetail?.start === 'undefined')
          return
        fields[key] = currentRow.slice(propDetail.start - 1, propDetail.end)
      })
      list.push(fields)
      return list
    }, [])
}

const getDbtContent = computed(() => state.dbtContent)

function automaticallySearchColumns() {
  const rowTypes = getRowsFile.value.map(enginerSearch) as []
  const refTypes = Object.fromEntries(rowTypes)
  state.dbtDataObject.forEach(({ row_props, row_type }) => {
    row_props.push(...refTypes[row_type])
  })
}

watch(getDbtContent, () => {
  const types: string[] = []
  const itens = getRowsFile.value.reduce((list: DataObjectDBTType[], actualRow: string) => {
    const currentType = actualRow[0]
    if (!types.includes(currentType)) {
      types.push(currentType)
      list.push(dbtItem(list, currentType))
    }
    return list
  }, [])
  state.dbtDataObject = itens
  automaticallySearchColumns()
})

const getDbtJson = computed(() => {
  const details = state.dbtDataObject.map((fields) => fieldValues(fields)).flat()
  return JSON.stringify(details, null, 2)
})

export { state, setContent, getRowsFile, getDbtContent, getDbtJson }

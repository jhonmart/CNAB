import type { DataObjectDBTType } from '@/types/DBTProps'

export function varNamePattern(name: string) {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.exec(name)) return name
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\W+/)
    .map((word, index) => (index ? word[0].toUpperCase() + word.slice(1) : word.toLowerCase()))
    .join('')
}

export function formatProp(prop: string[]) {
  return {
    name: prop[0],
    start: Number(prop[1]),
    end: Number(prop[1]) + Number(prop[2]) - 1,
  }
}

export function dbtItem(list: DataObjectDBTType[], currentType: string): DataObjectDBTType {
  return {
    id: list.length,
    row_type: currentType,
    row_name: `Tipo ${currentType}`,
    row_props: [],
    row_draft: {
      name: '',
      start: undefined,
      end: undefined,
    },
  }
}

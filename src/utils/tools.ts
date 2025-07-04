import type { DataObjectDBTType } from '@/types/DBTProps.ts'
import { colorHelper } from './constants.ts'

export function deepClone(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}

export function resetNewProp({ row_draft }: DataObjectDBTType) {
  row_draft.name = ''
  row_draft.start = undefined
  row_draft.end = undefined
}

export function getNewColor(index: number) {
  return colorHelper[index % colorHelper.length]
}

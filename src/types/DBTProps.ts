export type PropDetailType = {
  name: string
  start: number | undefined
  end: number | undefined
}
export type DataObjectDBTType = {
  id: number
  row_props: PropDetailType[]
  row_type: string
  row_name: string
  row_draft: PropDetailType
}

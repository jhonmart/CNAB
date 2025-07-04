import type { DataObjectDBTType } from '@/types/DBTProps.ts'
import { getNewColor } from './tools.ts'

export function syntaxJSON(data: string) {
  const json = (data || '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+\.?\d*\b)/g,
    (match: string) => {
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
}

export function syntaxDBT(groups: { [key: string]: string }[][], rules: DataObjectDBTType[]) {
  let colorId = 0
  const cacheColor: { [key: string]: string } = {}

  return groups
    .map((group) => {
      return group
        .map((row) => {
          const rule = rules.find(
            ({ row_type }) => row_type === row['Tipo de registro do arquivo'],
          )?.row_props

          if (!rule) return []

          return Object.entries(row)
            .map(([name, value], propIx) => {
              const ruleField = rule.find(({ name: ruleName }) => ruleName === name)
              if (typeof ruleField?.end === 'undefined' || typeof ruleField?.start === 'undefined')
                return ''
              const ruleLength = ruleField.end - ruleField.start + 1
              const colorName = `pr${propIx}_${name}`
              const tag = document.createElement('span')
              const color = cacheColor[colorName] || getNewColor(colorId++)

              if (!cacheColor[colorName]) cacheColor[colorName] = color

              let detailCell = `[${name}]`
              tag.classList.add('prop-dbt')
              tag.innerHTML = value // XSS??
              if (value.length !== ruleLength) {
                tag.setAttribute('fail', 'size')
                detailCell +=
                  ' Houve uma divergência: o campo apresenta ' +
                  `${value.length} caracteres, quando deveria ter ${ruleLength}.`
              }
              tag.setAttribute('title', detailCell)
              tag.setAttribute('data-tooltip', name)
              tag.style.color = color
              return tag.outerHTML
            })
            .join('')
        })
        .join('<br>')
    })
    .join('<br>')
}

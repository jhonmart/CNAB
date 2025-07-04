export function clipboardData(event: ClipboardEvent) {
  event.preventDefault()
  return event.clipboardData?.getData('text')
}

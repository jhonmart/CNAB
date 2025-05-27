export function clipboardData(event) {
  event.preventDefault();
  return (event.clipboardData || window.clipboardData).getData('text');
}

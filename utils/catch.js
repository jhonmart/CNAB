export function clipboardData(event) {
  event.preventDefault();
  return (event.clipboardData || window.clipboardData).getData('text');
}

export function handleTooltipFollowMouse() {
  document.querySelectorAll('.prop-dbt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const tooltip = el;
      const x = e.clientX; // margem lateral do mouse
      const y = e.clientY - 355;

      tooltip.style.setProperty('--tooltip-x', `${x}px`);
      tooltip.style.setProperty('--tooltip-y', `${y}px`);
      tooltip.classList.add('show-tooltip');
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('show-tooltip');
    });
  });
}

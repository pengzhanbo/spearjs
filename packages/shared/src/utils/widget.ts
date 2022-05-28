declare global {
  interface Window {
    __spearjs_low_code__: any
  }
}

window.__spearjs_low_code__ = window.__spearjs_low_code__ || {}

const spearjs = window.__spearjs_low_code__

export const registerWidget = (widget: any): void => {
  spearjs.widgetMap = spearjs.widgetMap || {}
  const key = `${widget.id}-${widget.version}`
  if (!spearjs.widgetMap[key]) {
    spearjs.widgetMap[key] = widget
  }
}

spearjs.registerWidget = registerWidget

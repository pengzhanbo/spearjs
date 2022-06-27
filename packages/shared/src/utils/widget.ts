import type { Widget } from '../types'

declare global {
  interface globalThis {
    __spearjs_low_code__: any
  }
}

globalThis.__spearjs_low_code__ = globalThis.__spearjs_low_code__ || {}

const spearjs = globalThis.__spearjs_low_code__

export const registerWidget = (widget: Widget): void => {
  spearjs.widgetMap = spearjs.widgetMap || {}
  const key = `${widget.id}-${widget.version}`
  if (!spearjs.widgetMap[key]) {
    spearjs.widgetMap[key] = widget
  }
}

spearjs.registerWidget = registerWidget

import type { Widget } from '../types'

declare global {
  interface globalThis {
    __spearjs_low_code__: {
      widgetMap: Record<string, any>
      registerWidget: (widget: Widget) => void
    }
  }
}

globalThis.__spearjs_low_code__ = globalThis.__spearjs_low_code__ || {}

const spearjs = globalThis.__spearjs_low_code__

spearjs.widgetMap = spearjs.widgetMap || {}

export const widgetMap = spearjs.widgetMap

export const registerWidget = (widget: Widget): void => {
  spearjs.widgetMap = spearjs.widgetMap || {}
  const key = `${widget.id}-${widget.version}`
  if (!spearjs.widgetMap[key]) {
    spearjs.widgetMap[key] = widget
  }
}

spearjs.registerWidget = registerWidget

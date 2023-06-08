import type { Widget } from '../types'

declare global {
  interface globalThis {
    __spearjs_low_code__: {
      widgetMap: Record<string, any>
      registerWidget: (widget: Widget) => void
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(globalThis as any).__spearjs_low_code__ =
  (globalThis as any).__spearjs_low_code__ || {}

const spearjs = (globalThis as any).__spearjs_low_code__
spearjs.global = spearjs.global || {}
spearjs.widgetMap = spearjs.widgetMap || {}

export const widgetMap = spearjs.widgetMap

export const registerWidget = (widget: Widget): void => {
  const key = `${widget.id}-${widget.version}`
  if (!widgetMap[key]) {
    widgetMap[key] = widget
  }
}

export const hasWidget = ({
  id,
  version,
}: {
  id: string
  version: string
}): boolean => !!widgetMap[`${id}-${version}`]

spearjs.registerWidget = registerWidget

import { WidgetMap, registerWidget, Widget } from '@spearjs/shared'

export interface SpearJs {
  widgetMap: WidgetMap
  registerWidget: (widget: Widget) => void
}
export const spearJs: SpearJs = (() => {
  window.__spearjs_low_code__ = window.__spearjs_low_code__ || { widgetMap: {}, registerWidget }
  return window.__spearjs_low_code__
})()

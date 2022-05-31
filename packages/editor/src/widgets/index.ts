import { registerWidget } from '@spearjs/shared'
import Button from './button'

registerWidget(Button)

export const getWidgetList = async () => {
  return [
    {
      id: 'button',
      label: 'button',
      version: '1.0.0',
      type: 'component',
      componentType: 'basis',
    },
  ]
}

export const findWidget = (id: string, version: string) => {
  const spearJs = window.__spearjs_low_code__ || {}
  const widgetMap = spearJs.widgetMap || {}
  const key = `${id}-${version}`
  return widgetMap[key]
}

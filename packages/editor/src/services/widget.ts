import type { ComponentWidget } from '@spearjs/shared'
import { spearJs } from '@editor/common'

export interface WidgetComponentItem {
  id: string
  label: string
  version: string
  type: 'component'
  componentType: string
  url: string
}

export const getWidgetComponentList = async ({
  type = 'basis',
}): Promise<WidgetComponentItem[]> => {
  console.log(type)
  return [
    {
      id: 'button',
      label: 'button',
      version: '1.0.0',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
    {
      id: 'gird-container',
      version: '1.0.0',
      label: '栅格布局',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
    {
      id: 'widget-flex',
      version: '1.0.0',
      label: 'flex布局',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
  ]
}

export const findWidget = (id: string, version: string): ComponentWidget => {
  const widgetMap = spearJs.widgetMap || {}
  const key = `${id}-${version}`
  return widgetMap[key]
}

import { widgetMap } from '@spearjs/shared'
import type { ComponentWidget } from '@spearjs/shared'

export interface WidgetComponentItem {
  id: string
  label: string
  version: string
  type: 'component'
  componentType: string
  url: string
}

export const getWidgetComponentList = async ({
  _type = 'basis',
}): Promise<WidgetComponentItem[]> => {
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
    {
      id: 'vant-button',
      label: 'vant-button',
      version: '1.0.0',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
    {
      id: 'vant-cell',
      label: 'vant-cell',
      version: '1.0.0',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
  ]
}

export const findWidget = (id: string, version: string): ComponentWidget => {
  const key = `${id}-${version}`
  return widgetMap[key]
}

import type { WidgetExposeList } from '@spearjs/shared'

/**
 * widget 类型为 component 时，预设 expose
 */
export const preExposeList: WidgetExposeList = [
  {
    type: 'method',
    label: '显示组件',
    name: 'show',
    global: true,
  },
  {
    type: 'method',
    label: '隐藏组件',
    name: 'hide',
    global: true,
  },
]

import { ComponentWidget } from '@spearjs/shared'
import { ElRow, ElCol } from 'element-plus'

export default {
  label: '栅格布局',
  id: 'gird-container',
  version: '1.0.0',
  type: 'component',
  componentType: 'basis',
  platform: 'mobile',
  preview: () => {
    const cols = [8, 8, 8]
    return (
      <ElRow gutter={20} class="w-56 bg-gray-200 rounded-sm">
        {cols.map((col) => (
          <ElCol span={col}>
            <div class="bg-gray-300 border h-8 rounded-sm"></div>
          </ElCol>
        ))}
      </ElRow>
    )
  },
  description: () => {
    return <p>这是一个布局容器</p>
  },
  render: ({ props, slots }) => {
    return (
      <ElRow>
        {props.cols.map((col: number, i: number) => (
          <ElCol span={col}>{slots[`col-${i}`]?.()}</ElCol>
        ))}
      </ElRow>
    )
  },
  props: [
    {
      key: 'cols',
      label: '列',
      type: 'array',
      defaultValue: [12, 12],
      items: {
        type: 'number',
        label: '列',
        defaultValue: 1,
      },
    },
  ],
  slots: (props) => {
    return props.cols.map((_: number, i: number) => `col-${i}`)
  },
} as ComponentWidget

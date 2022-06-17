import { ComponentWidget } from '@spearjs/shared'
import { CSSProperties } from 'vue'

export default {
  id: 'widget-flex',
  version: '1.0.0',
  label: 'Flex布局',
  type: 'component',
  componentType: 'basis',
  componentSubType: 'element-plus',
  platform: 'mobile',
  layer: {
    display: 'block',
    zIndex: 1,
  },
  slots: (props) => {
    return props.items.map((_: any, index: number) => `item-${index}`)
  },
  description: () => {
    return <div>这是一个flex容器</div>
  },
  preview: () => {
    return (
      <div class="w-56 bg-gray-200 rounded-sm py-2 flex justify-around items-center">
        <div class="h-6 bg-gray-400 rounded-sm">around</div>
        <div class="h-6 bg-gray-400 rounded-sm">around</div>
      </div>
    )
  },
  render: ({ props, slots }) => {
    const { flexDirection, justifyContent, alignItems } = props
    const styles = { flexDirection, justifyContent, alignItems }
    return (
      <div class="flex" style={styles}>
        {props.items.map((style: CSSProperties, index: number) => {
          return slots[`item-${index}`]({ style })
        })}
      </div>
    )
  },
  props: [
    {
      type: 'select',
      key: 'flexDirection',
      label: '布局方向',
      defaultValue: 'row',
      options: [
        { label: '从左向右', value: 'row' },
        { label: '从上向下', value: 'column' },
        { label: '从右向左', value: 'row-reverse' },
        { label: '从下向上', value: 'column-reverse' },
      ],
    },
    {
      type: 'select',
      key: 'justifyContent',
      label: '主轴位置',
      defaultValue: 'flex-start',
      options: [
        {
          label: '常用',
          options: [
            { label: 'start', value: 'flex-start' },
            { label: 'end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'around', value: 'space-around' },
            { label: 'between', value: 'space-between' },
          ],
        },
        {
          label: '其他',
          options: [
            { label: 'evenly', value: 'space-evenly' },
            { label: 'stretch', value: 'stretch' },
          ],
        },
      ],
    },
    {
      type: 'select',
      key: 'alignItems',
      label: '交叉轴位置',
      defaultValue: 'flex-start',
      options: [
        { label: 'start', value: 'flex-start' },
        { label: 'end', value: 'flex-end' },
        { label: 'center', value: 'center' },
        { label: 'stretch', value: 'stretch' },
      ],
    },
    {
      type: 'array',
      key: 'items',
      label: 'flex项目',
      minLength: 1,
      defaultValue: [{ flex: '' }],
      items: {
        type: 'object',
        label: '项',
        defaultValue: { flex: '' },
        props: [
          {
            type: 'select',
            key: 'flex',
            label: '宽度',
            defaultValue: '',
            options: [
              { label: '自适应', value: '' },
              { label: '填充剩余空间', value: '1' },
            ],
          },
        ],
      },
    },
  ],
} as ComponentWidget

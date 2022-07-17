import { defineEditorConfig } from '@spearjs/shared'
import { Cell } from 'vant'

export default defineEditorConfig({
  description: () => {
    return <p>vant Cell 组件</p>
  },
  preview: () => {
    return (
      <div style={{ width: '200px' }}>
        <Cell title="单元格" value="内容" size="large" label="描述信息" />
      </div>
    )
  },
  layer: {
    display: 'block',
  },
  actions: [
    {
      label: '点击单元格',
      action: 'click',
    },
  ],
  props: [
    {
      type: 'text',
      key: 'title',
      label: '左侧标题',
      defaultValue: '标题',
      placeholder: '请输入按钮标题',
    },
    {
      type: 'text',
      key: 'value',
      label: '右侧内容',
      defaultValue: '副标题',
    },
    {
      type: 'text',
      key: 'label',
      defaultValue: '描述信息',
      label: '标题描述',
      textarea: true,
    },
    {
      type: 'select',
      key: 'size',
      label: '大小',
      defaultValue: 'normal',
      options: [
        { label: '普通', value: 'normal' },
        { label: '大号', value: 'large' },
        { label: '小号', value: 'small' },
        { label: '迷你', value: 'min' },
      ],
    },
    {
      type: 'text',
      key: 'url',
      label: '跳转到',
    },
    {
      type: 'switch',
      key: 'clickable',
      label: '点击反馈',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'is-link',
      label: '右侧箭头',
      defaultValue: false,
    },
    {
      type: 'select',
      key: 'arrow-direction',
      label: '箭头方向',
      options: [
        { label: '向右', value: 'right' },
        { label: '向上', value: 'up' },
        { label: '向下', value: 'down' },
        { label: '向左', value: 'left' },
      ],
    },
    {
      type: 'switch',
      key: 'center',
      label: '内容居中',
      defaultValue: false,
    },
  ],
})

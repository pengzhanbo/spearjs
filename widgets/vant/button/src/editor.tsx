import { defineEditorConfig } from '@spearjs/shared'
import { Button } from 'vant'

export default defineEditorConfig({
  description: () => {
    return <p>vant 按钮组件</p>
  },
  preview: () => {
    return <Button type="primary">按钮</Button>
  },
  layer: {
    display: 'inline-block',
  },
  actions: [
    {
      action: 'click',
      label: '点击事件',
    },
  ],
  props: [
    {
      type: 'text',
      key: 'text',
      label: '按钮文字',
      defaultValue: '按钮',
      placeholder: '请输入按钮文字',
    },
    {
      type: 'select',
      key: 'type',
      label: '类型',
      options: [
        { label: '默认按钮', value: 'default' },
        { label: '主要按钮', value: 'primary' },
        { label: '成功按钮', value: 'success' },
        { label: '警告按钮', value: 'warning' },
        { label: '危险按钮', value: 'danger' },
      ],
    },
    {
      type: 'select',
      key: 'size',
      label: '大小',
      defaultValue: 'normal',
      options: [
        { label: '普通按钮', value: 'normal' },
        { label: '大号按钮', value: 'large' },
        { label: '小号按钮', value: 'small' },
        { label: '迷你按钮', value: 'min' },
      ],
    },
    {
      type: 'color',
      key: 'color',
      label: '颜色',
      colorFormat: 'rgb',
    },
    {
      type: 'select',
      key: 'icon',
      label: '图标',
      options: [
        { label: '无', value: '' },
        { label: 'Plus', value: 'plus' },
        { label: 'Minus', value: 'minus' },
      ],
    },
    {
      type: 'switch',
      key: 'block',
      label: '单行按钮',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'plain',
      label: '朴素按钮',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'square',
      label: '方形按钮',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'round',
      label: '圆型按钮',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'disabled',
      label: '禁用按钮',
      defaultValue: false,
    },
    {
      type: 'switch',
      key: 'hairline',
      label: '细线框',
      defaultValue: false,
    },
    {
      type: 'text',
      key: 'url',
      label: '跳转到',
    },
  ],
})

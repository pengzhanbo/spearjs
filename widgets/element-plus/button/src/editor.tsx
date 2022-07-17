import { defineEditorConfig } from '@spearjs/shared'
import { ElButton } from 'element-plus'

export default defineEditorConfig({
  preview() {
    return <ElButton type="primary">按钮</ElButton>
  },
  description() {
    return <div>Element-Plus 按钮，适用于PC端</div>
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
      key: 'buttonText',
      label: '按钮文字',
      type: 'text',
      defaultValue: '按钮',
      tips: '按钮文字',
      placeholder: '请输出按钮文字',
    },
    {
      key: 'type',
      label: '按钮类型',
      type: 'select',
      defaultValue: 'primary',
      multiple: false,
      options: [
        { label: '主要按钮', value: 'primary' },
        { label: '普通按钮', value: 'info' },
        { label: '成功按钮', value: 'success' },
        { label: '警告按钮', value: 'warning' },
        { label: '危险按钮', value: 'danger' },
      ],
    },
    {
      key: 'text',
      label: '文字按钮',
      type: 'switch',
      defaultValue: false,
      activeText: '是',
      inactiveText: '否',
    },
    {
      key: 'plain',
      label: '朴素按钮',
      type: 'switch',
      defaultValue: false,
    },
    {
      key: 'round',
      label: '圆角按钮',
      type: 'switch',
      defaultValue: false,
    },
    {
      key: 'circle',
      label: '圆形按钮',
      type: 'switch',
      defaultValue: false,
    },
    {
      key: 'link',
      label: '链接按钮',
      type: 'switch',
      defaultValue: false,
    },
    {
      key: 'icon',
      label: '图标',
      type: 'select',
      defaultValue: '',
      options: [
        { label: '无', value: '' },
        { label: 'Search', value: 'Search' },
        { label: 'Edit', value: 'Edit' },
        { label: 'Check', value: 'Check' },
        { label: 'Message', value: 'Message' },
        { label: 'Star', value: 'Star' },
        { label: 'Delete', value: 'Delete' },
      ],
    },
    {
      key: 'color',
      label: '按钮颜色',
      type: 'color',
      defaultValue: '',
      showAlpha: true,
    },
    {
      key: 'autofocus',
      label: '自动聚焦',
      type: 'switch',
      defaultValue: false,
    },
  ],
})

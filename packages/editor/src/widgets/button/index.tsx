// import { useBlock } from '@editor/hooks/useBlock'
import type { ComponentWidget } from '@spearjs/shared'
import { ElButton } from 'element-plus'

export default {
  id: 'button',
  name: 'button',
  label: '按钮',
  version: '1.0.0',
  type: 'component',
  componentType: 'basis',
  platform: 'mobile',
  description: () => {
    return (
      <>
        <p>这是一个按钮</p>
        <p>这是一个测试使用的 描述说明</p>
      </>
    )
  },
  preview: () => {
    return <ElButton type="primary">按钮</ElButton>
  },
  setup() {
    // const block = useBlock()
    // console.log(block)
    // block.setProps({ buttonText: '按钮2222' })
  },
  render({ props }) {
    const { buttonText, ...otherProps } = props
    return buttonText ? (
      <ElButton {...otherProps}>{buttonText}</ElButton>
    ) : (
      <ElButton {...otherProps} />
    )
  },
  actions: [
    {
      label: '点击按钮',
      action: 'onClick',
    },
  ],
  services: [
    {
      name: '测试',
      fn: () => {
        // const block = useBlock()
        // console.log(block)
      },
    },
  ],
  layer: {
    display: 'inline-block',
  },
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
      type: 'group',
      label: '分组',
      props: [
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
      ],
    },
  ],
} as ComponentWidget

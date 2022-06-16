import { ComponentWidget } from '@spearjs/shared'
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
  render({ props, styles }) {
    const { buttonText, ...otherProps } = props
    return buttonText ? (
      <ElButton style={styles} {...otherProps}>
        {buttonText}
      </ElButton>
    ) : (
      <ElButton style={styles} {...otherProps} />
    )
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
      ],
    },
    {
      type: 'group',
      label: '分组',
      props: [
        {
          key: 'num',
          label: '数字',
          type: 'number',
          defaultValue: 1,
          step: 1,
          min: 0,
          max: 999,
        },
      ],
    },
    {
      type: 'object',
      label: '对象测试',
      key: 'obj',
      tips: '对象测试描述',
      props: [
        {
          key: 'aa',
          type: 'text',
          label: '文本',
          tips: '对象文本属性 obj.aa',
          defaultValue: '1',
          placeholder: '请填入文本',
        },
      ],
    },
    {
      type: 'array',
      label: '数组测试',
      key: 'cols',
      tips: '数组测试描述',
      defaultValue: ['1', '2'],
      maxLength: 0,
      minLength: 0,
      items: {
        type: 'text',
        label: 'col',
        defaultValue: '1',
      },
    },
  ],
} as ComponentWidget

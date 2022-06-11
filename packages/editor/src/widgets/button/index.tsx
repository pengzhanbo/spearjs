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
    return (
      <ElButton style={styles} {...otherProps}>
        {buttonText}
      </ElButton>
    )
  },
  props: [
    {
      key: 'buttonText',
      type: String,
      form: {
        label: '按钮文字',
        type: 'input',
        defaultValue: '按钮',
      },
    },
    {
      key: 'text',
      type: Boolean,
      form: {
        label: '是否为文字按钮',
        type: 'switch',
        defaultValue: false,
        desc: '',
      },
    },
    {
      key: 'type',
      type: String,
      form: {
        label: '按钮类型',
        type: 'select',
        defaultValue: 'primary',
        options: [
          { label: '主要按钮', value: 'primary' },
          { label: '成功按钮', value: 'success' },
        ],
      },
    },
  ],
} as ComponentWidget

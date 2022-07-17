import { defineEditorConfig } from '@spearjs/shared'
import { ElLink } from 'element-plus'

export default defineEditorConfig({
  preview() {
    return <ElLink type="primary">跳转链接</ElLink>
  },
  description() {
    return (
      <div>
        <p>文字链接，跳转到特定的URL</p>
      </div>
    )
  },
  layer: {
    display: 'inline-block',
  },
  props: [
    {
      type: 'text',
      key: 'text',
      label: '文本',
      defaultValue: '跳转链接',
    },
    {
      type: 'select',
      key: 'type',
      label: '文本类型',
      defaultValue: 'default',
      options: [
        { label: '默认', value: 'default' },
        { label: '主要', value: 'primary' },
        { label: '提示', value: 'info' },
        { label: '成功', value: 'success' },
        { label: '警告', value: 'warning' },
        { label: '危险', value: 'dander' },
      ],
    },
    {
      type: 'text',
      key: 'href',
      label: '链接地址',
      placeholder: 'https://example.com',
      defaultValue: '',
    },
    {
      type: 'switch',
      key: 'underline',
      label: '下划线',
      defaultValue: true,
    },
  ],
})

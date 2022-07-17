import { defineEditorConfig } from '@spearjs/shared'
import { Cell, CellGroup } from 'vant'

export default defineEditorConfig({
  description: () => {
    return <p>vant Cell 组件</p>
  },
  preview: () => {
    return (
      <CellGroup style={{ width: '240px' }}>
        <Cell title="单元格" value="内容" size="large" label="描述信息" />
        <Cell title="单元格" value="内容" size="large" label="描述信息" />
      </CellGroup>
    )
  },
  layer: {
    display: 'block',
  },
  slots: ['default'],
  props: [
    {
      type: 'text',
      key: 'title',
      defaultValue: '',
      label: '分组标题',
    },
    {
      type: 'switch',
      key: 'inset',
      defaultValue: false,
      label: '圆角卡片',
    },
    {
      type: 'switch',
      key: 'border',
      defaultValue: true,
      label: '显示边框',
    },
  ],
})

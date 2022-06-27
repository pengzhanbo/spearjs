import { defineEditorConfig } from '@spearjs/shared'
import description from './description'
import preview from './preview'
export default defineEditorConfig({
  preview,
  description,
  layer: {
    display: 'inline-block',
  },
  props: [
    {
      type: 'text',
      key: 'text',
      label: '按钮文本',
      defaultValue: '按钮',
    },
  ],
  actions: [],
  slots: [],
})

import { defineEditorConfig } from '@spearjs/shared'
import { ElButton, ElButtonGroup } from 'element-plus'

export default defineEditorConfig({
  preview() {
    return (
      <ElButtonGroup>
        <ElButton type="primary">按钮1</ElButton>
        <ElButton type="primary">按钮2</ElButton>
      </ElButtonGroup>
    )
  },
  description() {
    return (
      <div>
        <p>Element-Plus 按钮组合容器，适用于PC端。</p>
        <p>将多个按钮拖拽到容器中，形成按钮组合。</p>
      </div>
    )
  },
  layer: {
    display: 'inline-block',
  },
  slots: ['default'],
  props: [],
})

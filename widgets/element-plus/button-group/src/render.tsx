import { defineRenderConfig } from '@spearjs/shared'
import { ElButtonGroup } from 'element-plus'

export default defineRenderConfig({
  render({ slots }) {
    return <ElButtonGroup>{slots.default?.()}</ElButtonGroup>
  },
})

import { defineRenderConfig } from '@spearjs/shared'
import { CellGroup } from 'vant'

export default defineRenderConfig({
  render({ props, slots }) {
    return <CellGroup {...props}>{slots.default?.()}</CellGroup>
  },
})

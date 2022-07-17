import { defineRenderConfig } from '@spearjs/shared'
import { Cell } from 'vant'

export default defineRenderConfig({
  render({ props, action }) {
    return <Cell {...props} onClick={() => action('click')} />
  },
})

import { defineRenderConfig } from '@spearjs/shared'
import { ElLink } from 'element-plus'

export default defineRenderConfig({
  render({ props }) {
    const { text, ...otherProps } = props
    return <ElLink {...otherProps}>{text}</ElLink>
  },
})

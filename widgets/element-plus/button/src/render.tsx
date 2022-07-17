import { defineRenderConfig } from '@spearjs/shared'
import { ElButton } from 'element-plus'

export default defineRenderConfig({
  render({ props, action }) {
    const { buttonText, ...otherProps } = props
    return buttonText ? (
      <ElButton {...otherProps} onClick={() => action('click')}>
        {buttonText}
      </ElButton>
    ) : (
      <ElButton {...otherProps} onClick={() => action('click')} />
    )
  },
})

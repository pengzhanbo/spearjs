import { defineRenderConfig } from '@spearjs/shared'
import { Button } from 'vant'

export default defineRenderConfig({
  render({ props, action }) {
    const { text, ...otherProps } = props
    return (
      <Button {...otherProps} onClick={() => action('click')}>
        {text}
      </Button>
    )
  },
})

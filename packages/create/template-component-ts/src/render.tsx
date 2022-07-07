import { defineRenderConfig, useBlock } from '@spearjs/shared'

export default defineRenderConfig({
  setup(props, { expose }) {
    const block = useBlock()
    const onClick = () => {
      block.action('click')
    }
    // 对外暴露 组件的 public method/props
    expose({ onClick })

    return { onClick }
  },
  render({ props }) {
    return <div onClick={this.onClick}>{props.text}</div>
  },
})

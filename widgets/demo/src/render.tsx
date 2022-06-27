import { defineRenderConfig } from '@spearjs/shared'
import styles from './render.module.scss'

export default defineRenderConfig({
  setup: () => {
    return {
      a: 1,
    }
  },
  render({ props }) {
    return (
      <button class={styles.txt} {...props}>
        {props.text}
      </button>
    )
  },
})

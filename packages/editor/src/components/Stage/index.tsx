import { defineComponent } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Stage',
  render() {
    return (
      <div class={styles.canvasWrapper}>
        <div class="stage-container"></div>
      </div>
    )
  },
})

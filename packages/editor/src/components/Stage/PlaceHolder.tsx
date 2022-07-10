import type { PropType } from 'vue'
import { computed, defineComponent, Transition, watch } from 'vue'
import { setupPlaceholder } from './hooks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'StagePlaceholder',
  props: {
    rootRef: {
      type: Object as PropType<HTMLElement>,
      default: document.body,
    },
  },
  setup: (props) => {
    const { rectBound, setPlaceholderRoot, showPlaceholder } = setupPlaceholder()

    watch(
      () => props.rootRef,
      (root) => setPlaceholderRoot(root)
    )

    const style = computed(() => {
      const { left, top, width, height } = rectBound.value
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    })
    return () => (
      <Transition name="el-fade-in-linear">
        <div
          v-show={showPlaceholder.value}
          class={styles.stagePlaceholder}
          style={style.value}
        ></div>
      </Transition>
    )
  },
})

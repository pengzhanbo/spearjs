import { defineComponent } from 'vue'
import styles from './index.module.scss'
import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'
import Blocks from './Blocks'
import DragLayer from './DragLayer'
import { useBlocksDrop } from './hooks'

export default defineComponent({
  name: 'Stage',
  setup() {
    const pageStore = useAppPagesStore()

    const { blocks } = storeToRefs(pageStore)

    const { dropCollect, setRef } = useBlocksDrop()

    return () => (
      <div class={styles.stageWrapper}>
        <DragLayer />
        <div
          class={styles.stageContainer}
          ref={(el) => setRef(el as HTMLElement)}
          data-handler-id={dropCollect.value.handlerId}
        >
          <Blocks blocks={blocks.value} />
        </div>
      </div>
    )
  },
})

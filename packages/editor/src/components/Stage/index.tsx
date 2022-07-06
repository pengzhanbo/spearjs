import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'
import { defineComponent, withModifiers } from 'vue'
import Blocks from './Blocks'
import ContextMenu from './ContextMenu'
import DragLayer from './DragLayer'
import { useBlocksDrop, useContextMenu } from './hooks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Stage',
  setup() {
    const pageStore = useAppPagesStore()

    const { blocks } = storeToRefs(pageStore)

    const { dropCollect, setRef } = useBlocksDrop()

    const { open, close, setContextMenuRoot } = useContextMenu()

    const blurBlockHandler = () => {
      pageStore.setFocusBlock(null)
      close()
    }

    const contextMenuHandler = (ev: MouseEvent) => open(ev, null)

    return () => (
      <div class={styles.stageWrapper} ref={(el) => setContextMenuRoot(el as HTMLElement)}>
        <DragLayer />
        <ContextMenu />
        <div
          class={styles.stageContainer}
          ref={(el) => setRef(el as HTMLElement)}
          data-handler-id={dropCollect.value.handlerId}
          onClick={withModifiers(blurBlockHandler, ['self', 'stop'])}
          onContextmenu={withModifiers(contextMenuHandler, ['self', 'stop'])}
        >
          <Blocks blocks={blocks.value} />
        </div>
      </div>
    )
  },
})

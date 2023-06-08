import { useBlocksDrop, useContextMenu } from '@editor/hooks'
import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'
import { defineComponent, ref, withModifiers } from 'vue'
import Blocks from './Blocks'
import ContextMenu from './ContextMenu'
import DragLayer from './DragLayer'
import styles from './index.module.scss'
import PlaceHolder from './PlaceHolder'

export default defineComponent({
  name: 'Stage',
  setup() {
    const pageStore = useAppPagesStore()
    const { blocks } = storeToRefs(pageStore)
    const { dropCollect, setDropRef } = useBlocksDrop()
    const stageRef = ref<HTMLElement>()

    const { open, close } = useContextMenu()

    const blurBlockHandler = () => {
      pageStore.setFocusBlock(null)
      close()
    }

    const contextMenuHandler = (ev: MouseEvent) => open(ev, null)

    return () => (
      <div
        class={styles.stageWrapper}
        ref={(el) => (stageRef.value = el as HTMLElement)}
      >
        <DragLayer />
        <ContextMenu rootRef={stageRef.value} />
        <PlaceHolder rootRef={stageRef.value} />
        <div
          class={styles.stageContainer}
          ref={(el) => setDropRef(el as HTMLElement)}
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

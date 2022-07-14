import { useAppLayout } from '@editor/hooks'
import { useAppPagesStore } from '@editor/stores'
import type { Ref } from 'vue'
import { defineComponent, ref, withModifiers } from 'vue'
import LeftSidebar from '../LeftSidebar'
import Navbar from '../Navbar'
import RightController from '../RightController'
import Stage from '../Stage'
import { useContextMenu } from '../Stage/hooks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Home',
  setup() {
    const pageStore = useAppPagesStore()
    const { close } = useContextMenu()

    const blurBlockHandle = () => {
      pageStore.setFocusBlock(null)
      close()
    }

    const wrapperEl: Ref<HTMLElement | null> = ref(null)
    const { containerLayout, stageLayout } = useAppLayout(wrapperEl)

    return () => (
      <div ref={(el) => (wrapperEl.value = el as HTMLElement)} class={styles.editorWrapper}>
        <Navbar />
        <LeftSidebar />
        <div
          class={styles.editorContainer}
          style={containerLayout.value}
          onClick={withModifiers(blurBlockHandle, ['self', 'stop'])}
        >
          <Stage style={stageLayout.value} />
        </div>
        <RightController />
      </div>
    )
  },
})

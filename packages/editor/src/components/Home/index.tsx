import LeftSidebar from '@editor/components/LeftSidebar'
import Navbar from '@editor/components/Navbar'
import RightController from '@editor/components/RightController'
import Stage from '@editor/components/Stage'
import { useAppLayout, useContextMenu } from '@editor/hooks'
import { useAppPagesStore } from '@editor/stores'
import type { Ref } from 'vue'
import { defineComponent, ref, withModifiers } from 'vue'
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
      <div
        ref={(el) => (wrapperEl.value = el as HTMLElement)}
        class={styles.editorWrapper}
      >
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

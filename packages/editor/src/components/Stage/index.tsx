import { defineComponent } from 'vue'
import styles from './index.module.scss'
import { useDrop } from 'vue3-dnd'
import { useAppPagesStore } from '@editor/stores'
import { createBlock } from '@editor/services'
import { storeToRefs } from 'pinia'
import { ComponentWidget } from '@spearjs/shared'
import { WIDGET_DND_TYPE } from '@editor/common'
import Blocks from './Blocks'

export default defineComponent({
  name: 'Stage',
  setup() {
    const pageStore = useAppPagesStore()

    const { blocks } = storeToRefs(pageStore)

    const [, drop] = useDrop({
      accept: WIDGET_DND_TYPE.Component,
      drop: (item: ComponentWidget) => {
        if ((item as any).isCreate) {
          ;(item as any).isCreate = false
          return
        }
        const blocks = pageStore.currentPage.blocks
        const block = createBlock(item)
        blocks.push(block)
        pageStore.updateCurrentPage({
          blocks,
        })
        pageStore.setFocusBlock(block)
      },
    })
    return () => (
      <div class={styles.stageWrapper}>
        <div class={styles.stageContainer} ref={(el) => drop(el as HTMLElement)}>
          <Blocks blocks={blocks.value} />
        </div>
      </div>
    )
  },
})

import { defineComponent } from 'vue'
import Blocks from './Blocks'
import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'

import styles from './index.module.scss'

export default defineComponent({
  name: 'BlockTree',
  setup() {
    const pageStore = useAppPagesStore()

    const { blocks } = storeToRefs(pageStore)

    return () => (
      <div class={styles.blocksTreeWrapper}>
        <h3>组件树</h3>
        <div class="flex-1 px-5 py-2 overflow-y-auto">
          <Blocks blocks={blocks.value}></Blocks>
        </div>
      </div>
    )
  },
})

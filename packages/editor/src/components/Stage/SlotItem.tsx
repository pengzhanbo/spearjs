import { AppBlocks } from '@editor/services'
import { defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import styles from './slot.module.scss'
import Blocks from './Blocks'
import { useDrop } from 'vue3-dnd'

export default defineComponent({
  name: 'BlockSlot',
  props: {
    name: {
      type: String,
      default: 'slot-default',
    },
    blocks: {
      type: Array as PropType<AppBlocks>,
      default: () => [],
    },
  },
  setup(props) {
    const { blocks, name } = toRefs(props)

    const [, drop] = useDrop(() => ({
      accept: ['component'],
    }))

    return () => (
      <div class={styles.blockSlot} ref={(el) => drop(el as HTMLElement)}>
        {blocks.value.length === 0 ? (
          <div class={styles.slotPlaceholder}>组件拖到此slot:{name.value}</div>
        ) : (
          <Blocks blocks={blocks.value} />
        )}
      </div>
    )
  },
})

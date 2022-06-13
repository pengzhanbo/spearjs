import { AppBlocks } from '@editor/services'
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import Blocks from './Blocks'
import { useBlocksDrop } from './hooks'

import styles from './slot.module.scss'

export default defineComponent({
  name: 'BlockSlot',
  props: {
    roadMap: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    blocks: {
      type: Array as PropType<AppBlocks>,
      default: () => [],
    },
  },
  setup(props) {
    const { blocks, name } = toRefs(props)

    const roadMap = computed(() => {
      const roadMap = `slot:${props.name}:${props.index}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })

    const { dropCollect, setRef } = useBlocksDrop(roadMap)

    return () => (
      <div
        class={styles.blockSlot}
        ref={(el) => setRef(el as HTMLElement)}
        data-handler-id={dropCollect.value.handlerId}
      >
        {blocks.value.length === 0 ? (
          <div class={styles.slotPlaceholder}>组件拖到此slot:{name.value}</div>
        ) : (
          <div class={[styles.slotContainer, dropCollect.value.canDrop ? styles.canDrop : '']}>
            <Blocks blocks={blocks.value} roadMap={roadMap.value} />
          </div>
        )}
      </div>
    )
  },
})

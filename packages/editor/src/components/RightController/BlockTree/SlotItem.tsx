import type { AppBlocks } from '@editor/services'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import Blocks from './Blocks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'TreeBlockSlot',
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
    const roadMap = computed(() => {
      const roadMap = `slot:${props.name}:${props.index}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })

    return () => (
      <div class={styles.treeBlockSlot}>
        <p class={styles.treeSlotTitle}>slot: {props.name}</p>
        <Blocks blocks={props.blocks} roadMap={roadMap.value}></Blocks>
      </div>
    )
  },
})

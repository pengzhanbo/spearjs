import { AppBlock } from '@editor/services'
import { defineComponent, PropType, VNode } from 'vue'
import SlotItem from './SlotItem'
import { ElIcon } from 'element-plus'
import { ScaleToOriginal } from '@element-plus/icons-vue'

import styles from './index.module.scss'

export default defineComponent({
  name: 'TreeBlock',
  props: {
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
    roadMap: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const renderSlots = (): VNode[] | undefined => {
      if (!props.block.slots) return
      const slots: VNode[] = []
      Object.keys(props.block.slots).forEach((slot) => {
        const blocks = props.block.slots[slot] || []
        if (blocks.length) {
          slots.push(
            <SlotItem name={slot} index={props.index} roadMap={props.roadMap} blocks={blocks} />
          )
        }
      })
      return slots
    }

    return () => (
      <li class={styles.treeBlockItem}>
        <div class={styles.treeTitle}>
          <p class="flex items-center">
            <ElIcon class="el-icon__left mr-1">
              <ScaleToOriginal />
            </ElIcon>
            <span>{props.block.label}</span>
          </p>
        </div>
        {renderSlots()}
      </li>
    )
  },
})

import type { AppBlock } from '@editor/services'
import { ScaleToOriginal } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import type { Component, PropType } from 'vue'
import { defineComponent } from 'vue'
import styles from './index.module.scss'
import SlotItem from './SlotItem'

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
    const renderSlots = (): Component[] | undefined => {
      if (!props.block.slots) return
      const slots: Component[] = []
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

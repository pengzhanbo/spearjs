import { ArrowMiniRightIcon } from '@editor/components/Icons'
import type { AppBlocks } from '@editor/services'
import { ElCollapseTransition } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
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
      const roadMap = `slot:${props.name}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })

    const spread = ref(true)
    const triggerSpread = () => {
      spread.value = !spread.value
    }

    return () => (
      <div class={styles.treeBlockSlot}>
        <p class={[styles.treeSlotTitle, spread.value ? '' : styles.hide]} onClick={triggerSpread}>
          <span class="el-icon">
            <ArrowMiniRightIcon />
          </span>
          <span>slot: {props.name}</span>
        </p>
        <ElCollapseTransition>
          <Blocks v-show={spread.value} blocks={props.blocks} roadMap={roadMap.value} />
        </ElCollapseTransition>
      </div>
    )
  },
})

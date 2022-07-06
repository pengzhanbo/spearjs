import type { AppBlockGroup } from '@editor/services'
import { Folder } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import Blocks from './Blocks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'TreeBlockGroup',
  props: {
    group: {
      type: Object as PropType<AppBlockGroup>,
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
    const roadMap = computed(() => {
      return props.roadMap ? `${props.roadMap}|group::${props.index}` : ''
    })
    return () => (
      <li class={styles.treeBlockItem}>
        <div class={styles.treeTitle}>
          <p class="flex items-center">
            <ElIcon>
              <Folder />
            </ElIcon>
            <span class="ml-1">{props.group.label}</span>
          </p>
        </div>
        <Blocks blocks={props.group.blocks} roadMap={roadMap.value}></Blocks>
      </li>
    )
  },
})

import { AppBlockGroup } from '@editor/services'
import { computed, defineComponent, PropType } from 'vue'
import Blocks from './Blocks'
import { ElIcon } from 'element-plus'
import { Folder } from '@element-plus/icons-vue'

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
      <li>
        <p>
          <ElIcon>
            <Folder />
          </ElIcon>
          <span>{props.group.label}</span>
        </p>
        <Blocks blocks={props.group.blocks} roadMap={roadMap.value}></Blocks>
      </li>
    )
  },
})

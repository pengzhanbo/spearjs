import { defineComponent, PropType } from 'vue'
import Blocks from './Blocks'
import { AppBlockGroup } from '@editor/services'
import styles from './index.module.scss'

export default defineComponent({
  name: 'StageBlocksGroup',
  props: {
    group: {
      type: Object as PropType<AppBlockGroup>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class={styles.widgetComponentGroup}>
        <Blocks blocks={props.group.blocks}></Blocks>
      </div>
    )
  },
})

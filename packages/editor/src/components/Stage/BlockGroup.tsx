import { defineComponent, PropType } from 'vue'
import Block from './Block'
import { AppBlockGroup } from '@editor/stores'
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
        {props.group.blocks.map((block, i) => (
          <Block block={block} group-index={props.index} index={i} type="group"></Block>
        ))}
      </div>
    )
  },
})

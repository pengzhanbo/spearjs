import type { AppBlocks } from '@spearjs/core'
import { defineComponent, TransitionGroup } from 'vue'
import type { PropType } from 'vue'
import Block from './Block'
import BlockGroup from './BlockGroup'
import styles from './index.module.scss'

export default defineComponent({
  name: 'TreeBlocks',
  props: {
    blocks: {
      type: Array as PropType<AppBlocks>,
      required: true,
    },
    roadMap: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <ul class={styles.blocksTree}>
        <TransitionGroup name="flip-list">
          {props.blocks.map((block, index) => {
            if (block.type === 'group') {
              return (
                <BlockGroup group={block} index={index} roadMap={props.roadMap} key={block.bid} />
              )
            } else {
              return <Block block={block} index={index} roadMap={props.roadMap} key={block.bid} />
            }
          })}
        </TransitionGroup>
      </ul>
    )
  },
})

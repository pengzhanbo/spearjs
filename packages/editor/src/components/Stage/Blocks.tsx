import type { AppBlock, AppBlockGroup, AppBlocks } from '@spearjs/core'
import { defineComponent, TransitionGroup } from 'vue'
import type { PropType } from 'vue'
import Block from './Block'
import BlockGroup from './BlockGroup'

export default defineComponent({
  name: 'AppBlocks',
  props: {
    blocks: {
      type: Array as PropType<AppBlocks>,
      required: true,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    roadMap: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <TransitionGroup name="flip-list">
        {props.blocks.map((block, index) => {
          if (block && (block as AppBlockGroup).blocks) {
            return (
              <BlockGroup
                group={block as AppBlockGroup}
                index={index}
                preview={props.preview}
                roadMap={props.roadMap}
                key={block.bid}
              />
            )
          } else {
            return (
              <Block
                key={(block as AppBlock).bid}
                block={block as AppBlock}
                index={index}
                roadMap={props.roadMap}
                preview={props.preview}
              />
            )
          }
        })}
      </TransitionGroup>
    )
  },
})

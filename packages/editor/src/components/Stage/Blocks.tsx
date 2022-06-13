import { defineComponent, PropType, TransitionGroup } from 'vue'
import BlockGroup from './BlockGroup'
import Block from './Block'
import type { AppBlockGroup, AppBlock, AppBlocks } from '@editor/services'

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
          if ((block as AppBlockGroup).blocks) {
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

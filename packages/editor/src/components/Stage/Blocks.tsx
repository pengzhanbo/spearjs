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
                key={(block as AppBlockGroup).key}
              />
            )
          } else {
            return <Block block={block as AppBlock} index={index} key={(block as AppBlock).bid} />
          }
        })}
      </TransitionGroup>
    )
  },
})

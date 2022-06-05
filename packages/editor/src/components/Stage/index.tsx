import { defineComponent, TransitionGroup } from 'vue'
import styles from './index.module.scss'
import { useDrop } from 'vue3-dnd'
import { AppBlock, AppBlockGroup, useAppPagesStore } from '@editor/stores'
import Block from './Block'
import BlockGroup from './BlockGroup'
import { storeToRefs } from 'pinia'
// import GroupMove from '../Transition/GroupMove'

export default defineComponent({
  name: 'Stage',
  setup() {
    const pageStore = useAppPagesStore()

    const { blocks } = storeToRefs(pageStore)

    const [, drop] = useDrop(() => ({
      accept: ['component'],
    }))
    return () => (
      <div class={styles.stageWrapper}>
        <div class={styles.stageContainer} ref={(el) => drop(el as HTMLElement)}>
          <TransitionGroup name="flip-list">
            {blocks.value.map((block, index) => {
              if ((block as AppBlockGroup).blocks) {
                return (
                  <BlockGroup group={block as AppBlockGroup} index={index} key={'group-' + index} />
                )
              } else {
                return (
                  <Block
                    block={block as AppBlock}
                    index={index}
                    key={(block as AppBlock).componentId}
                  />
                )
              }
            })}
          </TransitionGroup>
        </div>
      </div>
    )
  },
})

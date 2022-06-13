import { computed, defineComponent, PropType, watch, withModifiers } from 'vue'
import Blocks from './Blocks'
import { AppBlockGroup } from '@editor/services'
import { useBlockDnd } from './hooks'
import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'

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
    const roadMap = computed(() => {
      return props.roadMap ? `${props.roadMap}|group::${props.index}` : ''
    })
    const { dragCollect, dropCollect, setItem, setRef } = useBlockDnd({
      bid: props.group.bid,
      index: props.index,
      roadMap: roadMap.value,
    })

    watch(
      [props],
      ([props]) => {
        setItem({
          bid: props.group.bid,
          index: props.index,
          roadMap: roadMap.value,
        })
      },
      { immediate: true }
    )

    const pageStore = useAppPagesStore()

    const { focusBlock } = storeToRefs(pageStore)

    const setFocusBlock = () => pageStore.setFocusBlock(props.group)

    // 当进行拖拽时，将拖拽中的元素变为全透明
    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : 1
    })

    return () => (
      <div
        ref={(el) => setRef(el as Element)}
        class={[
          styles.widgetComponentGroup,
          {
            [styles.focus]: props.preview || props.group.bid === focusBlock.value?.bid,
          },
        ]}
        style={{ opacity: opacity.value }}
        data-label={props.group.label}
        data-handler-id={dropCollect.value.handlerId}
        onClick={withModifiers(setFocusBlock, ['stop'])}
      >
        <Blocks
          blocks={props.group.blocks}
          roadMap={roadMap.value}
          preview={props.preview}
        ></Blocks>
      </div>
    )
  },
})

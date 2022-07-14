import { useBlockDnd, useContextMenu } from '@editor/hooks'
import type { AppBlockGroup } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import { computed, defineComponent, watch, withModifiers } from 'vue'
import Blocks from './Blocks'
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
      const roadMap = `${props.index}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })
    const { dragCollect, dropCollect, setItem, setRef } = useBlockDnd({
      bid: props.group.bid,
      index: props.index,
      roadMap: roadMap.value,
      group: true,
      layer: 'block',
    })

    watch(
      [() => props, () => roadMap.value],
      ([props, roadMap]) => {
        setItem({
          bid: props.group.bid,
          index: props.index,
          roadMap: roadMap,
          group: true,
          layer: 'block',
        })
      },
      { immediate: true, deep: true }
    )

    const pageStore = useAppPagesStore()

    const { focusBlock } = storeToRefs(pageStore)

    const { open, close } = useContextMenu()

    const setFocusBlock = () => {
      pageStore.setFocusBlock(props.group)
      close()
    }
    const onContextMenu = (ev: MouseEvent) => {
      open(ev, props.group, roadMap.value, props.index)
    }

    // 当进行拖拽时，将拖拽中的元素变为全透明
    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : 1
    })

    const visibility = computed(() => (props.group.editor.visibility ? 'inherit' : 'hidden'))

    return () => (
      <div
        ref={(el) => setRef(el as Element)}
        class={[
          styles.widgetComponentGroup,
          {
            [styles.focus]: props.preview || props.group.bid === focusBlock.value?.bid,
          },
        ]}
        style={{ opacity: opacity.value, visibility: visibility.value }}
        data-label={props.group.label}
        data-handler-id={dropCollect.value.handlerId}
        onClick={withModifiers(setFocusBlock, ['stop'])}
        onContextmenu={withModifiers(onContextMenu, ['stop'])}
      >
        {props.group.blocks.length === 0 ? (
          <div class={styles.groupPlaceholder}>组件拖拽到此分组：{props.group.label}</div>
        ) : (
          <Blocks
            blocks={props.group.blocks}
            roadMap={roadMap.value}
            preview={props.preview}
          ></Blocks>
        )}
      </div>
    )
  },
})

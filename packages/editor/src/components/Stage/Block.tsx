import { useAppPagesStore } from '@editor/stores'
import { computed, defineComponent, h, readonly, VNode, watch } from 'vue'
import type { PropType, Slots } from 'vue'
import { createWidgetComponent, findWidget } from '@editor/services'
import type { AppBlock } from '@editor/services'
import styles from './index.module.scss'
import { useBlockDnd } from './hooks/useBlockDnD'
import { storeToRefs } from 'pinia'
import SlotItem from './SlotItem'

export default defineComponent({
  name: 'StageBlock',
  props: {
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    groupIndex: {
      type: Number,
      default: 0,
    },
    type: {
      type: String as PropType<'group' | undefined>,
      default: '',
    },
  },
  setup(props) {
    // --- block dnd begin ---
    // block dnd 拖拽
    const { setRef, dragCollect, dropCollect, setItem } = useBlockDnd({
      bid: props.block.bid,
      index: props.index,
      groupIndex: props.groupIndex,
      isGroup: props.type === 'group',
    })

    // props 变化时，更新 拖拽目标信息
    watch(
      [props],
      ([props]) => {
        setItem({
          bid: props.block.bid,
          index: props.index,
          groupIndex: props.groupIndex,
          isGroup: props.type === 'group',
        })
      },
      { immediate: true }
    )
    // --- block dnd end ---

    const block = computed(() => {
      const { label, component, bid, props: _props, styles, slots } = props.block
      const widget = findWidget(component.id, component.version)
      return {
        component: createWidgetComponent(widget),
        label,
        bid,
        props: _props,
        styles,
        slots,
      }
    })

    // 当进行拖拽时，将拖拽中的元素变为全透明
    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : 1
    })

    const pageStore = useAppPagesStore()

    const { focusBlock } = storeToRefs(pageStore)

    const setFocusBlock = () => pageStore.setFocusBlock(props.block)

    // 对于支持 slot 的 widget，需要 渲染其所有的 slot
    const renderSlots = (): Slots | undefined => {
      if (!block.value.slots) return
      const slots = {}
      Object.keys(block.value.slots).forEach((slot) => {
        slots[slot] = (): VNode => <SlotItem name={slot} blocks={block.value.slots[slot] || []} />
      })
      return slots as Slots
    }

    // 渲染 widget
    const render = () =>
      h(
        block.value.component,
        {
          bid: block.value.bid,
          // 对于内部而言，属性应该是只读的，内部不可修改
          props: readonly(block.value.props),
          styles: readonly(block.value.styles),
        },
        renderSlots()
      )

    return () => (
      <div
        class={[
          styles.widgetComponent,
          {
            [styles.focus]: props.block.bid === focusBlock.value?.bid,
          },
        ]}
        style={{ opacity: opacity.value }}
        ref={(el) => setRef(el as Element)}
        data-handler-id={dropCollect.value.handlerId}
        data-label={block.value.label}
        onClick={setFocusBlock}
      >
        {render()}
      </div>
    )
  },
})

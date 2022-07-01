import { createWidgetComponent, findWidget } from '@editor/services'
import type { AppBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { WidgetSlots } from '@spearjs/shared'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, h, readonly, watch, withModifiers } from 'vue'
import type { PropType, StyleValue } from 'vue'
import { useBlockDnd } from './hooks'
import styles from './index.module.scss'
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
    roadMap: {
      type: String,
      default: '',
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // --- block dnd begin ---
    // block dnd 拖拽
    const { setRef, dragCollect, dropCollect, setItem } = useBlockDnd({
      bid: props.block.bid,
      index: props.index,
      roadMap: props.roadMap,
    })

    // props 变化时，更新 拖拽目标信息
    watch(
      [props],
      ([props]) => {
        setItem({
          bid: props.block.bid,
          index: props.index,
          roadMap: props.roadMap,
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

    const pageStore = useAppPagesStore()

    const { focusBlock } = storeToRefs(pageStore)

    const setFocusBlock = () => pageStore.setFocusBlock(props.block)

    // 当进行拖拽时，将拖拽中的元素变为全透明
    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : block.value.styles.opacity
    })
    const borderKey = ['borderTop', 'borderRight', 'borderBottom', 'borderLeft']
    const blockStyles = computed(() => {
      const style: StyleValue = {}
      Object.keys(block.value.styles).forEach((key) => {
        if (block.value.styles[key] && key !== 'border') {
          style[key] = block.value.styles[key]
        } else {
          if (borderKey.includes(key)) {
            style[key] = block.value.styles['border']
          }
        }
      })
      // 强制转换其他定位方式为 absolute
      if (block.value.styles.position !== '' && block.value.styles.position !== 'relative') {
        style.position = 'absolute'
      }
      return style
    })

    // 对于支持 slot 的 widget，需要 渲染其所有的 slot
    const renderSlots = (): WidgetSlots | undefined => {
      if (!block.value.slots) return
      const slots = {}
      Object.keys(block.value.slots).forEach((slot) => {
        const blocks = block.value.slots[slot] || []
        slots[slot] = (option = {}) => (
          <SlotItem
            name={slot}
            index={props.index}
            roadMap={props.roadMap}
            blocks={blocks}
            option={option}
          />
        )
      })
      return slots as WidgetSlots
    }

    return () => (
      <div
        class={[
          styles.widgetComponent,
          {
            [styles.focus]: props.preview || props.block.bid === focusBlock.value?.bid,
            [styles.hasSlot]: props.block.slots && Object.keys(props.block.slots).length > 0,
          },
        ]}
        style={[blockStyles.value, { opacity: opacity.value }]}
        ref={(el) => setRef(el as Element)}
        data-handler-id={dropCollect.value.handlerId}
        data-label={block.value.label}
        onClick={withModifiers(setFocusBlock, ['stop'])}
      >
        {h(
          block.value.component,
          {
            bid: block.value.bid,
            // 对于内部而言，属性应该是只读的，内部不可修改
            props: readonly(block.value.props),
            styles: readonly(block.value.styles),
          },
          renderSlots()
        )}
      </div>
    )
  },
})

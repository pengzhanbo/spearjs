import { useBlockDnd, useContextMenu } from '@editor/hooks'
import { createWidgetComponent, findWidget } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { AppBlock, AppBlockStyles } from '@spearjs/core'
import type { WidgetSlots } from '@spearjs/shared'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, h, readonly, watch, withModifiers } from 'vue'
import type { PropType, StyleValue } from 'vue'
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
    const roadMap = computed(() => {
      const roadMap = `${props.index}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })
    // --- block dnd begin ---
    // block dnd 拖拽
    const { setRef, dragCollect, dropCollect, setItem } = useBlockDnd({
      bid: props.block.bid,
      index: props.index,
      roadMap: roadMap.value,
      group: false,
      layer: props.block.styles.display!,
    })

    // props 变化时，更新 拖拽目标信息
    watch(
      [() => props, () => roadMap.value],
      ([props, roadMap]) => {
        setItem({
          bid: props.block.bid,
          index: props.index,
          roadMap: roadMap,
          group: false,
          layer: props.block.styles.display!,
        })
      },
      { immediate: true, deep: true }
    )
    // --- block dnd end ---

    const block = computed(() => {
      const { label, widget, bid, props: _props, styles, slots, editor } = props.block
      const _widget = findWidget(widget.id, widget.version)
      return {
        component: createWidgetComponent(_widget),
        label,
        bid,
        props: _props,
        styles,
        slots,
        editor,
      }
    })

    // 当进行拖拽时，将拖拽中的元素变为全透明
    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : block.value.styles.opacity
    })
    const borderKey = ['borderTop', 'borderRight', 'borderBottom', 'borderLeft']
    const blockStyles = computed(() => {
      const style: StyleValue = {}
      Object.keys(block.value.styles).forEach((key) => {
        if (block.value.styles[key as keyof AppBlockStyles] && key !== 'border') {
          style[key as any] = block.value.styles[key as keyof AppBlockStyles]
        } else {
          if (borderKey.includes(key)) {
            style[key as any] = (block.value.styles as any)['border']
          }
        }
      })
      // 强制转换其他定位方式为 absolute
      if (block.value.styles.position !== '' && block.value.styles.position !== 'relative') {
        style.position = 'absolute'
      }
      style.visibility = block.value.editor.visibility ? 'inherit' : 'hidden'
      return style
    })

    // 对于支持 slot 的 widget，需要 渲染其所有的 slot
    const renderSlots = (): WidgetSlots | undefined => {
      if (!block.value.slots) return
      const slots: WidgetSlots = {}
      Object.keys(block.value.slots).forEach((slot) => {
        const blocks = block.value.slots[slot] || []
        slots[slot] = (option = {}) => (
          <SlotItem
            name={slot}
            index={props.index}
            roadMap={roadMap.value}
            blocks={blocks}
            option={option}
          />
        )
      })
      return slots
    }

    const pageStore = useAppPagesStore()
    const { open, close } = useContextMenu()
    const { focusBlock } = storeToRefs(pageStore)

    const setFocusBlock = () => {
      pageStore.setFocusBlock(props.block)
      close()
    }
    const onContextmenuHandle = (ev: MouseEvent) => {
      open(ev, props.block, props.roadMap, props.index)
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
        onContextmenu={withModifiers(onContextmenuHandle, ['stop'])}
      >
        {h(
          block.value.component,
          {
            bid: block.value.bid,
            // 对于内部而言，属性应该是只读的，内部不可修改
            props: readonly(block.value.props),
          },
          renderSlots()
        )}
      </div>
    )
  },
})

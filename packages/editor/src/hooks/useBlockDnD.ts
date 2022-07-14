import { WIDGET_DND_TYPE } from '@editor/common'
import { createBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { ComponentWidget } from '@spearjs/shared'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { onMounted, ref, watch } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import type { XYCoord } from 'vue3-dnd'
import { useDropPlaceHolder } from './useDropPlaceHolder'

export interface BlockDragItem {
  index: number
  roadMap: string
  bid: string
  group: boolean
  layer: 'inline-block' | 'block'
}

export const useBlockDnd = (_item: BlockDragItem) => {
  const blockEl = ref<HTMLDivElement>()
  const pageStore = useAppPagesStore()

  const item = ref<BlockDragItem>(_item)
  const setItem = (_item: BlockDragItem) => {
    item.value = _item
  }

  const [dragCollect, drag, preview] = useDrag({
    type: WIDGET_DND_TYPE.Block,
    item: () => item.value,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // 将拖拽预览效果重置为空图片，通过 useDragLayer 自定义预览
  onMounted(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })

  const { setPlaceholderHoverEl, origin, showPlaceholder } = useDropPlaceHolder()
  // 监听是否在拖拽中，并显示 拖拽目标位置提示占位符
  watch(
    () => dragCollect.value.isDragging,
    (isDragging) => {
      showPlaceholder.value = isDragging
    }
  )

  /**
   * 通过 roadMap 来解析 block 归属的 block group
   */
  const getParentRoadMap = (roadMap: string) => roadMap.slice(0, roadMap.lastIndexOf('|') || 0)

  const [dropCollect, drop] = useDrop<
    BlockDragItem,
    void,
    {
      handlerId: string | symbol | null
      isOver: boolean
      isCurrentOver: boolean
      canDrop: boolean
    }
  >({
    accept: [WIDGET_DND_TYPE.Block, WIDGET_DND_TYPE.Component],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      isCurrentOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    hover(dragItem: BlockDragItem | ComponentWidget, monitor) {
      if (!blockEl.value) return
      if (!monitor.isOver({ shallow: true })) return

      setPlaceholderHoverEl(blockEl.value)

      const type = monitor.getItemType()
      const hoverItem = item.value

      // 判定 拖拽元素悬浮与自身之上时，隐藏 拖拽目标位置占位符，
      // 表示 元素位置不会发生变更
      if (type === WIDGET_DND_TYPE.Block && (dragItem as BlockDragItem).bid === hoverItem.bid) {
        origin.value = 'self'
      } else {
        /**
         * 对于一个拖拽元素，当其悬浮于某个元素时，
         * 需要判断 拖拽的元素最终会放置于 悬浮元素的哪一个位置。
         *
         * 这里的判断是根据 鼠标位置相对于悬浮元素为参考系的偏移信息 (x, y)；
         * 根据 鼠标的位置，来判断 插入位置。
         * 判断方式是根据悬浮元素的对角线
         *  _____
         * |\   /|   根据鼠标的位置， 分为 top、right、bottom、left，
         * | \ / |   如果是分组类型的元素，那么相对于中心位置，使用三分线，在矩形的中心的三分之一矩形内，
         * | / \ |   那么类型为 center，表示插入到分组中
         * |/   \|
         * -------
         *
         */
        const { x, y } = monitor.getClientOffset() as XYCoord
        const { top, left, right, bottom } = blockEl.value.getBoundingClientRect()
        const width = right - left
        const height = bottom - top
        const rx = (x - left) / width
        const ry = (y - top) / height
        const w = width / 3
        const h = height / 3
        const m = height / 2

        /**
         * 如果是 layer是block类型，即表示 block独占一行，那么只需要判断 top/center/bottom即可
         */
        if (hoverItem.layer !== 'inline-block') {
          if (hoverItem.group && h <= y - top && y - top <= 2 * h) {
            origin.value = 'center'
          } else if (y - top > m) {
            origin.value = 'bottom'
          } else {
            origin.value = 'top'
          }
        } else {
          if (hoverItem.group && w <= x && x <= 2 * w && h <= y && y <= 2 * h) {
            origin.value = 'center'
          } else if (ry > 0.5 && rx > 1 - ry && 1 - rx > 1 - ry) {
            origin.value = 'bottom'
          } else if (ry <= 0.5 && rx > ry && 1 - rx > ry) {
            origin.value = 'top'
          } else if (rx < 0.5 && rx < ry && rx < 1 - ry) {
            origin.value = 'left'
          } else if (rx >= 0.5 && ry > 1 - rx && 1 - ry > 1 - rx) {
            origin.value = 'right'
          }
        }
      }
    },
    drop(dragItem: BlockDragItem | ComponentWidget, monitor) {
      if (!blockEl.value) return
      if (!monitor.isOver({ shallow: true })) return

      const hoverItem = item.value
      const type = monitor.getItemType()

      let index = hoverItem.index
      if (origin.value === 'bottom' || origin.value === 'right') {
        index += 1
      }

      if (type === WIDGET_DND_TYPE.Component) {
        const block = createBlock(dragItem as ComponentWidget)
        if (hoverItem.group && origin.value === 'center') {
          pageStore.pushBlockToGroup(block, hoverItem.roadMap)
        } else {
          pageStore.addBlock(block, hoverItem.roadMap, index)
        }
      } else {
        dragItem = dragItem as BlockDragItem

        if (dragItem.bid === hoverItem.bid) return

        const dragRoadMap = dragItem.roadMap
        const hoverRoadMap = hoverItem.roadMap

        // 表示两个 block都属于同一个 blocks group
        if (
          getParentRoadMap(dragRoadMap) === getParentRoadMap(hoverRoadMap) &&
          origin.value !== 'center'
        ) {
          pageStore.moveSameRoadMapBlock(dragItem.index, index, hoverRoadMap)
        } else {
          // 这里需要规避一种情况，即 拖拽元素悬浮与其内部的子元素中，
          // 需要避免 拽拽元素插入到其自身的子元素中
          if (!hoverRoadMap || hoverRoadMap.startsWith(dragRoadMap)) return

          pageStore.deleteBlock(dragItem.index, dragRoadMap, (block) => {
            if (hoverItem.group && origin.value === 'center') {
              pageStore.pushBlockToGroup(block, hoverRoadMap)
            } else {
              pageStore.addBlock(block, hoverRoadMap, index)
            }
          })
        }
      }
    },
  })

  /**
   * 同时设置 元素为 拖拽元素，以及 拖拽容器
   */
  const setRef = (el: Element) => {
    blockEl.value = el as HTMLDivElement
    drag(drop(el), { dropEffect: 'move' })
  }

  return {
    setRef,
    setItem,
    dragCollect,
    dropCollect,
  }
}

import { WIDGET_DND_TYPE } from '@editor/common'
import { createBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { ComponentWidget } from '@spearjs/shared'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { onMounted, ref, watch } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import type { XYCoord } from 'vue3-dnd'
import { usePlaceHolder } from './usePlaceHolder'

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

  const { setPlaceholderHoverEl, origin, showPlaceholder } = usePlaceHolder()
  watch(
    () => dragCollect.value.isDragging,
    (isDragging) => {
      showPlaceholder.value = isDragging
    }
  )

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
      if (type === WIDGET_DND_TYPE.Block && (dragItem as BlockDragItem).bid === hoverItem.bid) {
        origin.value = 'self'
      } else {
        const { x, y } = monitor.getClientOffset() as XYCoord
        const { top, left, right, bottom } = blockEl.value.getBoundingClientRect()
        const width = right - left
        const height = bottom - top
        const rx = (x - left) / width
        const ry = (y - top) / height
        const w = width / 3
        const h = height / 3
        const m = height / 2

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
        if (
          getParentRoadMap(dragRoadMap) === getParentRoadMap(hoverRoadMap) &&
          origin.value !== 'center'
        ) {
          pageStore.moveSameRoadMapBlock(dragItem.index, index, hoverRoadMap)
        } else {
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

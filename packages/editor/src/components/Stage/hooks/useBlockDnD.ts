/* TODO 拖拽交互需要重写
 * 目前体验下来，整个拖拽交互并不能满足实际的需求
 * 其中比较明显的问题是，如何判断是平级添加/移动，还是插入到分组/slot中
 */

import { WIDGET_DND_TYPE } from '@editor/common'
import { createBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { ComponentWidget } from '@spearjs/shared'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { onMounted, ref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import type { XYCoord } from 'vue3-dnd'

export interface BlockDragItem {
  index: number
  roadMap: string
  bid: string
}

export const useBlockDnd = (_item: BlockDragItem) => {
  const blockEl = ref<HTMLDivElement>()
  const pageStore = useAppPagesStore()

  const item = ref<BlockDragItem>(_item)

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

  const setItem = (_item: BlockDragItem) => {
    item.value = _item
  }

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
    drop(dragItem: BlockDragItem | ComponentWidget, monitor) {
      const type = monitor.getItemType()

      if (!blockEl.value) return
      if (!monitor.isOver({ shallow: true })) return

      const hoverItem = item.value
      const clientOffset = monitor.getClientOffset() as XYCoord
      const hoverRect = blockEl.value.getBoundingClientRect()

      // 获取 悬浮目标的 Y轴中位线
      const middleY = (hoverRect.bottom - hoverRect.top) / 2

      // 获取 拖拽目标与 悬浮目标的 Y轴差值
      // 可以通过比较两者之间的大小，来判断是否位于 上方还是下方
      const clientY = clientOffset.y - hoverRect.top

      if (type === WIDGET_DND_TYPE.Component) {
        const block = createBlock(dragItem as ComponentWidget)

        // 根据 hoverItem -> roadMap， 以及 鼠标位置，判断 插入位置
        const index = middleY > clientY ? hoverItem.index : hoverItem.index + 1

        pageStore.addBlock(block, hoverItem.roadMap, index)
      } else {
        dragItem = dragItem as BlockDragItem

        if (dragItem.bid === hoverItem.bid) return
        if (dragItem.roadMap === hoverItem.roadMap) {
          if (dragItem.index < hoverItem.index && clientY < middleY) return
          if (dragItem.index > hoverItem.index && clientY > middleY) return

          pageStore.moveSameRoadMapBlock(dragItem.index, hoverItem.index, dragItem.roadMap)
        } else {
          pageStore.deleteBlock(dragItem.index, dragItem.roadMap, (block) => {
            const insertTo = middleY > clientY ? hoverItem.index : hoverItem.index + 1
            pageStore.addBlock(block, hoverItem.roadMap, insertTo)
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

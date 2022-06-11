import { useAppPagesStore } from '@editor/stores'
import { ref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import type { XYCoord } from 'vue3-dnd'
import { WIDGET_DND_TYPE } from '@editor/common'

export interface BlockDragItem {
  bid: string
  index: number
  groupIndex: number
  isGroup: boolean
  type: string | symbol
}

export const useBlockDnd = (_item: Omit<BlockDragItem, 'type'>) => {
  const blockEl = ref<HTMLDivElement>()
  const pageStore = useAppPagesStore()

  const item = ref<BlockDragItem>({
    ..._item,
    type: WIDGET_DND_TYPE.Block,
  })

  const [dropCollect, drop] = useDrop<
    BlockDragItem,
    void,
    {
      handlerId: string | symbol | null
      isOver: boolean
      isCurrentOver: boolean
    }
  >({
    accept: [WIDGET_DND_TYPE.Block, WIDGET_DND_TYPE.Component],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      isCurrentOver: monitor.isOver({ shallow: true }),
    }),
    hover(dragItem: BlockDragItem, monitor) {
      const type = monitor.getItemType()
      if (type === WIDGET_DND_TYPE.Component) {
        return
      }
      if (!blockEl.value) return
      const hoverItem = item.value!
      if (dragItem.bid === hoverItem.bid) return

      const clientOffset = monitor.getClientOffset() as XYCoord
      const hoverRect = blockEl.value.getBoundingClientRect()
      // 获取 悬浮目标的 Y轴中位线
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
      // 获取 拖拽目标与 悬浮目标的 Y轴差值
      // 可以通过比较两者之间的大小，来判断是否位于 上方还是下方
      const hoverClientY = clientOffset.y - hoverRect.top

      // 从 group 移动到上层

      // 从 上层移动到 group 中

      // group移动到另一个group

      // 平级移动
      if (dragItem.isGroup && hoverItem.isGroup && dragItem.groupIndex === hoverItem.groupIndex) {
      }
      if (!dragItem.isGroup && !hoverItem.isGroup) {
        if (dragItem.index === hoverItem.index) return
        if (dragItem.index < hoverItem.index && hoverClientY < hoverMiddleY) return
        if (dragItem.index > hoverItem.index && hoverClientY > hoverMiddleY) return
        const blocks = [...pageStore.currentPage.blocks]
        const dragBlock = blocks[dragItem.index]
        blocks.splice(dragItem.index, 1)
        blocks.splice(hoverItem.index, 0, dragBlock)
        pageStore.updateBlocks(blocks)
        dragItem.index = hoverItem.index
      }
    },
  })

  const [dragCollect, drag] = useDrag({
    type: WIDGET_DND_TYPE.Block,
    item: () => item.value,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const setRef = (el: Element) => {
    blockEl.value = drag(drop(el), { dropEffect: 'move' }) as HTMLDivElement
  }

  const setItem = (_item: Omit<BlockDragItem, 'type'>) => {
    item.value = {
      ..._item,
      type: WIDGET_DND_TYPE.Block,
    }
  }

  return {
    setRef,
    setItem,
    dragCollect,
    dropCollect,
  }
}

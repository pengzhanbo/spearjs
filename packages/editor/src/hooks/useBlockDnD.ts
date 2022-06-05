import { useAppPagesStore } from '@editor/stores'
import { ref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'
import type { XYCoord } from 'vue3-dnd'

export interface BlockDragItem {
  componentId: string
  index: number
  groupIndex: number
  isGroup: boolean
  type: string | symbol
}
const DND_TYPE = Symbol('block')

export const useBlockDnd = (_item: Omit<BlockDragItem, 'type'>) => {
  const blockEl = ref<HTMLDivElement>()
  const pageStore = useAppPagesStore()

  const item = ref<BlockDragItem>({
    ..._item,
    type: DND_TYPE,
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
    accept: DND_TYPE,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      isCurrentOver: monitor.isOver({ shallow: true }),
    }),
    hover(dragItem: BlockDragItem, monitor) {
      if (!blockEl.value) return
      const hoverItem = item.value!
      if (dragItem.componentId === hoverItem.componentId) return
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

  const [dragCollect, drag, preview] = useDrag({
    type: DND_TYPE,
    item: () => item.value,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const setRef = (el: Element) => {
    blockEl.value = drag(drop(el)) as HTMLDivElement
  }

  const setPreview = (el: Element) => {
    preview(el)
  }

  const setItem = (_item: Omit<BlockDragItem, 'type'>) => {
    item.value = {
      ..._item,
      type: DND_TYPE,
    }
  }

  return {
    setRef,
    setItem,
    setPreview,
    dragCollect,
    dropCollect,
  }
}

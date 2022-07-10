/**
 * 当前 hooks 仅针对于 根 blocks， 以及 block 中有slot时，slot blocks 的场景，
 * 这个场景中， 元素仅作为 drop 容器， 其本身不能被拖拽
 */
import { WIDGET_DND_TYPE } from '@editor/common'
import { createBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { ComponentWidget } from '@spearjs/shared'
import type { ComputedRef } from 'vue'
import { ref } from 'vue'
import { useDrop } from 'vue3-dnd'
import type { BlockDragItem } from './useBlockDnD'
import { usePlaceHolder } from './usePlaceHolder'

export const useBlocksDrop = (_roadMap?: ComputedRef<string>) => {
  const pageStore = useAppPagesStore()
  const blocksEl = ref<HTMLElement | null>(null)
  const { origin, setPlaceholderHoverEl } = usePlaceHolder()
  const [dropCollect, drop] = useDrop<
    BlockDragItem,
    void,
    {
      handlerId: string | symbol | null
      canDrop: boolean | null
    }
  >({
    accept: [WIDGET_DND_TYPE.Component, WIDGET_DND_TYPE.Block],
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: ComponentWidget | BlockDragItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return
      if (!blocksEl.value) return
      if (blocksEl.value.lastElementChild) {
        setPlaceholderHoverEl(blocksEl.value.lastElementChild as HTMLElement)
        origin.value = 'bottom'
      }
    },
    drop(dragItem: ComponentWidget | BlockDragItem, monitor) {
      if (!monitor.isOver({ shallow: true })) return
      const dropRoadMap = _roadMap?.value || ''
      const type = monitor.getItemType()
      if (type === WIDGET_DND_TYPE.Component) {
        const block = createBlock(dragItem as ComponentWidget)
        pageStore.addBlock(block, dropRoadMap)
        pageStore.setFocusBlock(block)
      } else {
        dragItem = dragItem as BlockDragItem

        // 这里需要规避一种情况，即 拖拽元素悬浮与其内部的子元素中，
        // 需要避免 拽拽元素插入到其自身的子元素中
        if (!dragItem.roadMap || dropRoadMap.startsWith(dragItem.roadMap)) return

        pageStore.deleteBlock(dragItem.index, dragItem.roadMap, (block) => {
          pageStore.addBlock(block, dropRoadMap)
        })
      }
    },
  })

  const setDropRef = (el: HTMLElement) => {
    blocksEl.value = el
    drop(el as HTMLElement)
  }

  return {
    dropCollect,
    setDropRef,
  }
}

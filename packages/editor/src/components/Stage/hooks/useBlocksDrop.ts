import type { ComputedRef } from 'vue'
import { useDrop } from 'vue3-dnd'
import { WIDGET_DND_TYPE } from '@editor/common'
import type { ComponentWidget } from '@spearjs/shared'
import type { BlockDragItem } from './useBlockDnD'
import { useAppPagesStore } from '@editor/stores'
import { createBlock } from '@editor/services'

export const useBlocksDrop = (_roadMap?: ComputedRef<string>) => {
  const pageStore = useAppPagesStore()
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
    drop(item: ComponentWidget | BlockDragItem, monitor) {
      if (!monitor.isOver({ shallow: true })) return
      const roadMap = _roadMap?.value || ''
      const type = monitor.getItemType()
      if (type === WIDGET_DND_TYPE.Component) {
        const block = createBlock(item as ComponentWidget)
        pageStore.addBlock(block, roadMap)
        pageStore.setFocusBlock(block)
      } else {
        item = item as BlockDragItem
        if (!item.roadMap || roadMap.startsWith(item.roadMap)) {
          // 避免当 block 支持 slot时，block小范围拖拽到 自身的 slot中
          const _roadMap = item.roadMap
            ? roadMap.replace(new RegExp(`^${item.roadMap}\\|`), '')
            : roadMap
          const [type, , index] = _roadMap.split(':')
          if (type === 'slot' && Number(index) === item.index) return
        }
        pageStore.deleteBlock(item.index, item.roadMap, (block) => {
          pageStore.addBlock(block, roadMap)
        })
      }
    },
  })

  const setRef = (el: Element) => {
    drop(el as HTMLElement)
  }

  return {
    dropCollect,
    setRef,
  }
}

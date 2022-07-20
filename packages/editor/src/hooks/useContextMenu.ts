import { getElOffset } from '@editor/utils'
import type { AppBlock, AppBlockGroup } from '@spearjs/core'
import type { Directive, Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

type OpenContextMenuRef = Ref<boolean>
type ContextMenuStyleRef = Ref<{ top: string; left: string }>
type BlockRef = Ref<AppBlock | AppBlockGroup | null>
type RoadMapRef = Ref<string | undefined>
type IndexRef = Ref<number | undefined>
type ContextMenuRootRef = Ref<HTMLElement | null>

const targetList: WeakSet<HTMLElement> = new WeakSet()

const isOpen: OpenContextMenuRef = ref(false)
const style: ContextMenuStyleRef = ref({ left: '0', top: '0' })
const currentBlock: BlockRef = ref(null)
const currentBlockRoadMap: RoadMapRef = ref()
const currentIndex: IndexRef = ref()
const contextMenuRoot: ContextMenuRootRef = ref(null)

const open = (
  ev: MouseEvent,
  block: AppBlock | AppBlockGroup | null,
  roadMap?: string,
  index?: number
) => {
  ev.preventDefault()
  isOpen.value = true
  currentBlock.value = block
  currentBlockRoadMap.value = roadMap
  currentIndex.value = index
  if (!block) {
    style.value = {
      left: ev.offsetX + 'px',
      top: ev.offsetY + 'px',
    }
    return
  }
  // 计算 菜单打开的位置信息
  // 位置信息相对于 stage容器计算位置
  const { offsetLeft, offsetTop } = getElOffset(ev.target as HTMLElement, contextMenuRoot.value!)
  style.value = {
    left: offsetLeft + ev.offsetX + 'px',
    top: offsetTop + ev.offsetY + 'px',
  }
}

const close = () => {
  isOpen.value = false
}

const setContextMenuRoot = (el: HTMLElement) => {
  contextMenuRoot.value = el
}

/**
 * 指令，收集contextmenu 相关的元素
 */
export const contextMenuOutSide: Directive = {
  mounted: (target) => targetList.add(target),
  unmounted: (target) => targetList.delete(target),
}

export const setupContextMenu = () => {
  const handler = (ev: MouseEvent) => {
    // 如果点击的是目标元素的子元素，也被认为是 目标元素
    let parent = ev.target as HTMLElement
    let hasTarget = targetList.has(parent)
    while (!hasTarget && parent) {
      parent = parent.parentNode as HTMLElement
      hasTarget = targetList.has(parent)
    }
    if (isOpen.value && !hasTarget) {
      close()
    }
  }
  onMounted(() => {
    window.addEventListener('click', handler, false)
    window.addEventListener('contextmenu', handler, false)
  })
  onUnmounted(() => {
    window.removeEventListener('click', handler)
    window.removeEventListener('contextmenu', handler)
  })
  return {
    isOpen,
    style,
    block: currentBlock,
    roadMap: currentBlockRoadMap,
    index: currentIndex,
    close,
    setContextMenuRoot,
  }
}

export const useContextMenu = () => {
  return {
    open,
    close,
  }
}

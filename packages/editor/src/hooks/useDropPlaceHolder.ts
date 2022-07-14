/**
 * 当进行拖拽操作时，提示当前拖拽操作的结果，
 * 拖拽元素将会被插入到哪个位置
 */
import { getElOffset } from '@editor/utils'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

type RectBound = {
  left: number
  top: number
  width: number
  height: number
}

type Origin = 'top' | 'right' | 'left' | 'bottom' | 'center' | 'self' | ''

type RectBoundRef = Ref<RectBound>
type OriginRef = Ref<Origin>

const root: Ref<HTMLElement | null> = ref(null)
const hoverEl: Ref<HTMLElement | null> = ref(null)
const origin: OriginRef = ref('')
const showPlaceholder = ref(false)
const rectBound: RectBoundRef = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
})

const setPlaceholderRoot = (el: HTMLElement) => {
  root.value = el
}

const setPlaceholderHoverEl = (el: HTMLElement) => {
  hoverEl.value = el
}

export const setupDropPlaceholder = () => {
  watch(
    [() => root.value, () => hoverEl.value, () => origin.value],
    ([root, hoverEl, origin]) => {
      if (!root || !hoverEl) return
      showPlaceholder.value = true
      const {
        offsetLeft: left,
        offsetTop: top,
        offsetWidth: width,
        offsetHeight: height,
      } = getElOffset(hoverEl, root)
      const rect: RectBound = { left, top, width: 0, height: 0 }
      switch (origin) {
        case 'top':
          rect.width = width
          break
        case 'bottom':
          rect.width = width
          rect.top += height
          break
        case 'left':
          rect.height = height
          break
        case 'right':
          rect.height = height
          rect.left += width
          break
        case 'center':
          const w = width / 3
          const h = height / 3
          if (w < h) {
            rect.left += width / 2
            rect.top += h
            rect.height = h
          } else {
            rect.left += w
            rect.top += height / 2
            rect.width = w
          }
          break
        case 'self':
          showPlaceholder.value = false
          break
      }
      rectBound.value = rect
    },
    {
      immediate: true,
    }
  )

  return { setPlaceholderRoot, rectBound, showPlaceholder }
}

export const useDropPlaceHolder = () => {
  return {
    setPlaceholderHoverEl,
    showPlaceholder,
    origin,
  }
}

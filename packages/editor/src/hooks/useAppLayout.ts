import { useAppConfigStore } from '@editor/stores'
import type { Platform } from '@spearjs/shared'
import { storeToRefs } from 'pinia'
import type { CSSProperties, Ref } from 'vue'
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'

const mobileContentLayout = {
  width: 320,
  height: 600,
}

const computedContainerLayout = (
  platform: Platform,
  layout: { width: string; center: boolean }
): CSSProperties => {
  const { clientWidth: cw, clientHeight: ch } = document.body || document.documentElement
  if (platform === 'mobile') {
    const px = cw - mobileContentLayout.width
    const py = (ch - mobileContentLayout.height) / 2
    return {
      width: (cw - mobileContentLayout.width) * 2 + mobileContentLayout.width + 'px',
      padding: `${py}px ${px}px`,
    }
  } else {
    return {
      width: `calc(100% + ${layout.width})`,
      padding: `80px ${cw / 2}px 100px`,
    }
  }
}

const computedStageLayout = (
  platform: Platform,
  layout: { width: string; center: boolean }
): CSSProperties => {
  const { clientWidth: cw, clientHeight: ch } = document.body || document.documentElement
  let width: string
  if (/%$/.test(layout.width.trim())) {
    width = (parseFloat(layout.width.trim()) * cw) / 100 + 'px'
  } else {
    width = layout.width
  }
  const style: CSSProperties = {
    width: platform === 'mobile' ? `${mobileContentLayout.width}px` : width,
    minHeight: (platform === 'mobile' ? mobileContentLayout.height : ch) + 'px',
  }
  if (platform === 'pc' && layout.center) {
    style.margin = '0 auto'
  }
  return style
}

export const useAppLayout = (
  wrapperEl: Ref<HTMLElement | null>
): {
  containerLayout: Ref<CSSProperties>
  stageLayout: Ref<CSSProperties>
} => {
  const appConfig = useAppConfigStore()
  const { platform, layout } = storeToRefs(appConfig)
  const containerLayout = ref<CSSProperties>({})
  const stageLayout = ref<CSSProperties>({})

  const resize = () => {
    containerLayout.value = computedContainerLayout(platform.value, layout.value)
    stageLayout.value = computedStageLayout(platform.value, layout.value)
  }
  watch(
    [() => platform.value, () => layout.value],
    ([platform, layout]) => {
      containerLayout.value = computedContainerLayout(platform, layout)
      stageLayout.value = computedStageLayout(platform, layout)
    },
    { immediate: true, deep: true }
  )
  watchEffect(() => {
    if (wrapperEl.value) {
      const { clientWidth: cw } = document.body || document.documentElement

      if (platform.value === 'mobile') {
        wrapperEl.value.scrollTo({
          left: (cw - mobileContentLayout.width) / 2,
          top: 0,
        })
      } else {
        wrapperEl.value.scrollTo({
          left: cw * 0.15,
          top: 0,
        })
      }
    }
  })
  resize()
  onMounted(() => {
    window.addEventListener('resize', resize, false)
    window.addEventListener('ratechange', resize, false)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    window.removeEventListener('ratechange', resize)
  })

  return {
    containerLayout,
    stageLayout,
  }
}

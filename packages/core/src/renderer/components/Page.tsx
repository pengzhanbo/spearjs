import { loader } from '@core/loader'
import type { AppBlocks, AppBlockWidgetAsset } from '@core/types'
import { hasWidget } from '@spearjs/shared'
import { defineComponent, ref, watchEffect } from 'vue'
import { useCurrentPage } from '../hooks'

const getPageWidgetList = (
  blocks: AppBlocks,
  res: AppBlockWidgetAsset[] = []
): AppBlockWidgetAsset[] => {
  blocks.forEach((block) => {
    if (block.type === 'group') {
      getPageWidgetList(block.blocks, res)
    } else {
      const widget = block.widget
      if (!res.find(({ id, version }) => id === widget.id && version === widget.version)) {
        res.push(widget)
      }
      Object.keys(block.slots || {}).forEach((slotName) => {
        getPageWidgetList(block.slots[slotName], res)
      })
    }
  })
  return res
}

export default defineComponent({
  name: 'Page',
  setup: () => {
    const currentPage = useCurrentPage()
    const loaded = ref(false)

    watchEffect(async () => {
      if (!currentPage.value) return
      const pageWidgetList = getPageWidgetList(currentPage.value.blocks)
      const promiseList: Promise<void>[] = []
      pageWidgetList.forEach(
        ({ id, version, css, js }) =>
          !hasWidget({ id, version }) &&
          promiseList.push(loader.load({ name: `${id}-${version}`, css, js }))
      )
      await Promise.all(promiseList)
      loaded.value = true
    })

    return () => (loaded.value ? <div>loaded</div> : <div>loading</div>)
  },
})

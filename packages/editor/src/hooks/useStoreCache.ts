/**
 * 对 store的状态变更进行缓存
 * 并实现 store 的可撤销和可恢复操作
 */
import type { AppConfig, AppPagesStore } from '@editor/stores'
import { store, useAppConfigStore, useAppPagesStore } from '@editor/stores'
import { useStorage } from '@vueuse/core'
import throttle from 'lodash-es/throttle'
import type { StateTree } from 'pinia'
import { computed, ref, watch } from 'vue'

type StoreCache = Record<string, StateTree>

const MAX_CACHE_LENGTH = 15
const CACHE_KEY = 'spearjs_store'

let isUserControl = false

const storeCache = ref<StoreCache[]>([])

const index = ref(0)

const addCache = (cache: StoreCache) => {
  if (index.value > 0 && index.value !== storeCache.value.length - 1) {
    storeCache.value.splice(index.value, storeCache.value.length - index.value + 1)
  }
  storeCache.value.push(JSON.parse(JSON.stringify(cache)))
  if (storeCache.value.length >= MAX_CACHE_LENGTH) {
    storeCache.value.shift()
  }
  index.value = storeCache.value.length - 1
}

export const setupStoreCache = async () => {
  // todo 应用ID与缓存中的应用ID对比判断缓存是否可用
  // todo 判断远程草稿中与当前缓存，根据时间关系 应用哪一份数据
  const storage = useStorage(CACHE_KEY, store.state.value)
  addCache(storage.value)
  const { updateConfig } = useAppConfigStore()
  const { updateAppPage } = useAppPagesStore()
  if (storage.value) {
    updateAppPage(storage.value.pages as AppPagesStore)
    updateConfig(storage.value.appConfig as AppConfig)
  }

  /**
   * 对于高频次变更状态，取 1秒的时间区间，在区间内的变更，仅计算为一次缓存
   */
  const throttleAddCache = throttle((state: StoreCache) => addCache(state), 1000, {
    leading: false,
    trailing: true,
  })

  watch(
    () => store.state.value,
    (state) => {
      storage.value = state
      if (!isUserControl) {
        throttleAddCache(state)
      }
    },
    { deep: true }
  )
}

export const useStoreCache = () => {
  const { updateConfig } = useAppConfigStore()
  const { updateAppPage } = useAppPagesStore()

  const canRedo = computed(() => index.value < storeCache.value.length - 1)
  const canUndo = computed(() => index.value > 0)
  const redo = async () => {
    if (index.value >= storeCache.value.length - 1) return

    index.value += 1
    isUserControl = true
    const cache = storeCache.value[index.value]
    updateAppPage(cache.pages as AppPagesStore)
    updateConfig(cache.appConfig as AppConfig)
    await Promise.resolve()
    isUserControl = false
  }
  const undo = async () => {
    if (index.value <= 0) return

    index.value -= 1
    isUserControl = true
    const cache = storeCache.value[index.value]
    updateAppPage(cache.pages as AppPagesStore)
    updateConfig(cache.appConfig as AppConfig)
    await Promise.resolve()
    isUserControl = false
  }
  return { canRedo, canUndo, redo, undo }
}

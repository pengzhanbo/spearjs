/**
 * 对 store的状态变更进行缓存
 * 并实现 store 的可撤销和可恢复操作
 */
import type { AppConfig, AppPagesStore } from '@editor/stores'
import { store, useAppConfigStore, useAppPagesStore } from '@editor/stores'
import { useStorage } from '@vueuse/core'
import type { StateTree } from 'pinia'
import { computed, ref, watch } from 'vue'

type StoreCache = Record<string, StateTree>

const MAX_CACHE_LENGTH = 10
const CACHE_KEY = 'spearjs_store'

let isUserControl = false

const storeCache = ref<StoreCache[]>([])

const index = ref(0)

const addCache = (cache: StoreCache) => {
  if (index.value > 0 && index.value !== storeCache.value.length - 1) {
    storeCache.value.splice(index.value, storeCache.value.length - index.value)
  }
  storeCache.value.push(cache)
  if (storeCache.value.length >= MAX_CACHE_LENGTH) {
    storeCache.value.shift()
  }
  index.value = storeCache.value.length - 1
}

export const setupStoreCache = () => {
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

  watch(
    () => store.state.value,
    (state) => {
      storage.value = state
      if (!isUserControl) {
        addCache(JSON.parse(JSON.stringify(state)))
        isUserControl = false
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
  const redo = () => {
    if (!canRedo.value) return

    index.value += 1
    const cache = storeCache.value[index.value]
    updateAppPage(cache.pages as AppPagesStore)
    updateConfig(cache.appConfig as AppConfig)
    isUserControl = true
  }
  const undo = () => {
    if (!canUndo.value) return
    index.value -= 1
    const cache = storeCache.value[index.value]
    updateAppPage(cache.pages as AppPagesStore)
    updateConfig(cache.appConfig as AppConfig)
    isUserControl = true
  }
  return { canRedo, canUndo, redo, undo }
}

import Formidable from '@editor/components/Formidable'
import { getDependencies } from '@editor/services'
import { useAppConfigStore, useAppPagesStore } from '@editor/stores'
import { computed, defineComponent, ref, watch } from 'vue'
import formConfig from './formConfig'

export default defineComponent({
  name: 'AppConfig',
  setup: () => {
    const appConfigStore = useAppConfigStore()
    const pageStore = useAppPagesStore()
    const appConfig = computed({
      get() {
        return appConfigStore
      },
      set(config) {
        appConfigStore.updateConfig(config)
      },
    })

    const config = ref(formConfig)
    const dependencies = computed(() => getDependencies(pageStore.pages))

    /**
     * 检查已使用的widget是否有UI框架依赖，
     * 如果已经有依赖，那么限定 不再支持重新选择 UI框架
     */
    watch(
      () => dependencies.value,
      (dependencies) => {
        const dependenceItem = config.value.find(
          (item) => item.type !== 'group' && item.key === 'dependence'
        )!
        if (dependencies.length === 0) {
          dependenceItem.type = 'select'
        } else {
          dependenceItem.type = 'textView'
        }
      },
      { immediate: true }
    )

    return () => (
      <div>
        <Formidable v-model={appConfig.value} config={config.value}></Formidable>
      </div>
    )
  },
})

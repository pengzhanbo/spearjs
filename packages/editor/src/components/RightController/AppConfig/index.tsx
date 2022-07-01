import Formidable from '@editor/components/Formidable'
import { useAppConfigStore } from '@editor/stores'
import { computed, defineComponent, watch } from 'vue'
import formConfig from './formConfig'

export default defineComponent({
  name: 'AppConfig',
  setup: () => {
    const appConfigStore = useAppConfigStore()
    const appConfig = computed({
      get() {
        return appConfigStore
      },
      set(config) {
        appConfigStore.updateConfig(config)
      },
    })

    watch(
      () => appConfigStore.platform,
      () => {
        appConfigStore.updateConfig({ dependence: '' })
      }
    )
    return () => (
      <div>
        <Formidable v-model={appConfig.value} config={formConfig}></Formidable>
      </div>
    )
  },
})

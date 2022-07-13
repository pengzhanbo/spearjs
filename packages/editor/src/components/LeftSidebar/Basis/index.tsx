import type { WidgetComponentItem } from '@editor/services/widget'
import { getWidgetComponentList } from '@editor/services/widget'
import { defineComponent, ref } from 'vue'
import WidgetPreview from '../WidgetPreview'
import styles from './index.module.scss'

export default defineComponent({
  name: 'BasisTab',
  setup: () => {
    const widgetList = ref<WidgetComponentItem[]>([])

    const initWidgetList = async () => {
      widgetList.value = await getWidgetComponentList({ _type: 'basis' })
    }
    initWidgetList()

    return () => (
      <div class={styles.container}>
        {widgetList.value.map((widget) => (
          <WidgetPreview widget={widget} key={widget.id} />
        ))}
      </div>
    )
  },
})

import { useAppPagesStore } from '@editor/stores'
import { ElTabPane, ElTabs } from 'element-plus'
import { computed, defineComponent, h, ref, watch } from 'vue'
import { ArrowDoubleLeftIcon, ArrowDoubleRightIcon } from '../Icons'
import BlockTree from './BlockTree'
import styles from './index.module.scss'
import { tabs } from './tabs'

export default defineComponent({
  name: 'RightController',
  setup: () => {
    const pageStore = useAppPagesStore()

    const tabEnabled = computed(() => {
      const block = pageStore.focusBlock
      const list = ['page-config', 'app-config']
      if (block && block.type === 'block')
        list.unshift('attrs-config', 'styles-config', 'action-config')
      return list
    })

    const activeTab = ref(tabEnabled.value[0])

    watch(
      [() => pageStore.focusBlock, () => tabEnabled.value],
      ([block, list]) => {
        if (!block || block.type === 'group') {
          if (!list.includes(activeTab.value)) activeTab.value = 'page-config'
        } else {
          activeTab.value = list[0]
        }
      },
    )

    const isOpen = ref(true)
    const handleOpen = () => {
      isOpen.value = !isOpen.value
    }

    return () => (
      <div class={[styles.wrapper, { [styles.open]: isOpen.value }]}>
        <div class={styles.btnArrow} onClick={handleOpen}>
          {isOpen.value ? <ArrowDoubleRightIcon /> : <ArrowDoubleLeftIcon />}
        </div>
        <ElTabs
          v-model={activeTab.value}
          type="border-card"
          class={styles.tabs}
        >
          {tabs.map((tab) => (
            <ElTabPane
              label={tab.label}
              name={tab.key}
              disabled={!tabEnabled.value.includes(tab.key)}
              lazy
              key={tab.key}
            >
              {h(tab.tab)}
            </ElTabPane>
          ))}
        </ElTabs>
        <BlockTree />
      </div>
    )
  },
})

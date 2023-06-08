import { ElIcon, ElTabPane, ElTabs } from 'element-plus'
import { defineComponent, h, ref } from 'vue'
import { ArrowDoubleLeftIcon, ArrowDoubleRightIcon } from '../Icons'
import styles from './index.module.scss'
import { tabs } from './tabs'

export default defineComponent({
  name: 'LeftSidebar',
  setup: () => {
    const activeTab = ref(tabs[0].key)

    const isOpen = ref(true)
    const handleOpen = () => {
      isOpen.value = !isOpen.value
    }

    return () => (
      <div class={[styles.leftSidebarWrapper, { [styles.open]: isOpen.value }]}>
        <div class={styles.btnArrow} onClick={handleOpen}>
          {h(isOpen.value ? ArrowDoubleLeftIcon : ArrowDoubleRightIcon)}
        </div>
        <ElTabs
          v-model={activeTab.value}
          tab-position="left"
          class={styles.leftSidebarTabs}
        >
          {tabs.map((tab) => (
            <ElTabPane name={tab.key} lazy>
              {{
                default: () => h(tab.tab),
                label: () => (
                  <div class="sidebar-tab">
                    <ElIcon size={24}>{h(tab.icon)}</ElIcon>
                    <p>{tab.label}</p>
                  </div>
                ),
              }}
            </ElTabPane>
          ))}
        </ElTabs>
      </div>
    )
  },
})

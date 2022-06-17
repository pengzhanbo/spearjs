import { defineComponent, computed, watch } from 'vue'
import Formidable from '../Formidable'
import { useAppPagesStore } from '@editor/stores'
import { findWidget } from '@editor/services'
import { isFunction } from '@spearjs/shared'

import styles from './index.module.scss'

export default defineComponent({
  name: 'AttrsConfig',
  setup() {
    const pageStore = useAppPagesStore()

    const block = computed(() => {
      const block = pageStore.focusBlock
      if (block) {
        if (block.type === 'block') {
          return block
        }
      }
      return null
    })

    const widget = computed(() => {
      const component = block.value?.component
      if (component) {
        return findWidget(component.id, component.version)
      }
      return null
    })

    const formData = computed({
      get: () => {
        return block.value ? block.value.props : {}
      },
      set: (_data) => {
        pageStore.updateFocusBlockProps(_data)
      },
    })

    /**
     * 监听 组件实例的 props 变更，
     * 如果 slots 定义为 一个函数，则需要执行后收集新的 slot name 数组
     */
    watch(
      () => formData.value,
      (data) => {
        if (!widget.value || !block.value || block.value.type !== 'block') return
        if (isFunction(widget.value.slots)) {
          pageStore.updateFocusBlockSlots(widget.value.slots(data))
        }
      },
      { deep: true }
    )

    return () => (
      <div class={styles.tabPanelContainer}>
        <p class="flex justify-between items-center text-sm font-bold pb-2 border-b mb-4">
          <span>组件名：{block.value?.label}</span>
          <span>组件ID: {block.value?.bid}</span>
        </p>
        {widget.value ? (
          <Formidable config={widget.value.props || []} v-model={formData.value} />
        ) : null}
      </div>
    )
  },
})

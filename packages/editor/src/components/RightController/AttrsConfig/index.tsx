import Formidable from '@editor/components/Formidable'
import { findWidget } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import { isFunction } from '@spearjs/shared'
import { computed, defineComponent, watch } from 'vue'
import { BlockHeader } from '../ConfigHeader'

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
      const widget = block.value?.widget
      if (widget) {
        return findWidget(widget.id, widget.version)
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

    return () =>
      block.value && widget.value ? (
        <>
          <BlockHeader block={block.value}></BlockHeader>
          <Formidable config={widget.value.props || []} v-model={formData.value} />
        </>
      ) : null
  },
})

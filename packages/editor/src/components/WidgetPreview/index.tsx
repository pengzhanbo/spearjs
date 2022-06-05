import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { WidgetComponentItem } from '@editor/services/widget'
import { findWidget } from '@editor/services/widget'
import styles from './index.module.scss'
import { ElIcon, ElPopover } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { useDrag } from 'vue3-dnd'
import { useAppPagesStore } from '@editor/stores'

export default defineComponent({
  name: 'WidgetPreview',
  props: {
    widget: {
      type: Object as PropType<WidgetComponentItem>,
      required: true,
    },
  },
  setup(props) {
    const widget = findWidget(props.widget.id, props.widget.version)
    const pageStore = useAppPagesStore()

    // TODO 待完善 组件拖拽逻辑
    // https://hcg1023.github.io/vue3-dnd/
    const [collect, dragSource] = useDrag({
      type: 'component',
      item: widget,
      collect: (monitor) => ({
        canDrag: monitor.canDrag(),
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
        type: monitor.getItemType(),
      }),
      end: (item) => {
        if (!collect.value.didDrop) return
        const blocks = pageStore.currentPage.blocks
        const block = pageStore.createBlock(item)
        blocks.push(block)
        pageStore.updateCurrentPage({
          blocks,
        })
        pageStore.setFocusBlock(block)
      },
    })

    return () => (
      <div class={[styles.preview, 'preview-container']}>
        <p class={styles.widgetLabel}>
          <span>{widget.label}</span>
          <ElPopover placement="right" trigger="hover">
            {{
              reference: () => (
                <ElIcon class={'el-icon__right cursor-pointer'}>
                  <InfoFilled />
                </ElIcon>
              ),
              default: () => widget.description(),
            }}
          </ElPopover>
        </p>
        <div class={styles.widgetPreview} ref={(el) => dragSource(el as HTMLElement)}>
          {widget.preview()}
        </div>
      </div>
    )
  },
})

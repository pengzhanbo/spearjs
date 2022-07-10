import { WIDGET_DND_TYPE } from '@editor/common'
import { usePlaceHolder } from '@editor/components/Stage/hooks'
import type { WidgetComponentItem } from '@editor/services/widget'
import { findWidget } from '@editor/services/widget'
import { ElIcon, ElPopover } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent, watch } from 'vue'
import { useDrag } from 'vue3-dnd'
import { InfoIcon } from '../Icons'
import styles from './index.module.scss'

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
    const { showPlaceholder } = usePlaceHolder()

    const [collect, dragSource] = useDrag({
      type: WIDGET_DND_TYPE.Component,
      item: widget,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    watch(
      () => collect.value.isDragging,
      (isDragging) => {
        if (!isDragging) {
          showPlaceholder.value = false
        }
      }
    )

    return () => (
      <div class={[styles.preview, 'preview-container']}>
        <p class={styles.widgetLabel}>
          <span>{widget.label}</span>
          <ElPopover placement="right" trigger="hover">
            {{
              reference: () => (
                <ElIcon class={'el-icon__right cursor-pointer'}>
                  <InfoIcon />
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

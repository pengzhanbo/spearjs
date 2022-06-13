import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { WidgetComponentItem } from '@editor/services/widget'
import { findWidget } from '@editor/services/widget'
import { ElIcon, ElPopover } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { useDrag } from 'vue3-dnd'
import { WIDGET_DND_TYPE } from '@editor/common'

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

    const [, dragSource] = useDrag({
      type: WIDGET_DND_TYPE.Component,
      item: widget,
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

import type { WidgetGroupProp } from '@spearjs/shared'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from './hooks'
import styles from './index.module.scss'
import PropItem from './PropItem'

export default defineComponent({
  name: 'FormidableNumberProp',
  props: {
    config: {
      type: Object as PropType<WidgetGroupProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class={styles.groupWrapper}>
        <label class={styles.groupLabel}>{props.config.label}</label>
        {props.config.props.map((prop) => (
          <PropItem config={prop} injectKey={props.injectKey} />
        ))}
      </div>
    )
  },
})

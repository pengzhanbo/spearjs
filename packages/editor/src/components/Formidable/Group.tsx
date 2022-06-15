import type { WidgetGroupProp } from '@spearjs/shared'
import { defineComponent } from 'vue'
import type { PropType, InjectionKey } from 'vue'
import PropItem from './PropItem'

import styles from './index.module.scss'

export default defineComponent({
  name: 'FormidableNumberProp',
  props: {
    config: {
      type: Object as PropType<WidgetGroupProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<InjectionKey<symbol>>,
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

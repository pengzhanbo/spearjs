import type { WidgetObjectProp } from '@spearjs/shared'
import { defineComponent, computed, PropType } from 'vue'
import { tips } from '../Tips'
import PropItem from '../PropItem'

import styles from '../index.module.scss'

export default defineComponent({
  name: 'FormidableObjectProp',
  props: {
    config: {
      type: Object as PropType<WidgetObjectProp>,
      required: true,
    },
    injectKey: {
      type: Symbol,
      required: true,
    },
    dotKey: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const dotKey = computed(() => {
      return props.dotKey ? `${props.dotKey}.${props.config.key}` : props.config.key
    })
    return () => (
      <div class={styles.objectWrapper}>
        <p class={styles.objectTitle}>
          <span>{props.config.label}</span>
          {tips(props.config.tips)}
        </p>
        {props.config.props.map((prop) => (
          <PropItem config={prop} injectKey={props.injectKey} dotKey={dotKey.value} />
        ))}
      </div>
    )
  },
})

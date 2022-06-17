import type { WidgetObjectProp } from '@spearjs/shared'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { tips } from '../Tips'
import PropItem from '../PropItem'
import { FormInjectKey, useDotKey } from '../hooks'

import styles from '../index.module.scss'

export default defineComponent({
  name: 'FormidableObjectProp',
  props: {
    config: {
      type: Object as PropType<WidgetObjectProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
    dotKey: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const dotKey = useDotKey(props)
    return () => (
      <div class={styles.objectWrapper}>
        <div class="flex-1">
          <p class={styles.objectTitle}>
            <span>{props.config.label}</span>
            {tips(props.config.tips)}
          </p>
          {props.config.props.map((prop) => (
            <PropItem config={prop} injectKey={props.injectKey} dotKey={dotKey.value} />
          ))}
        </div>
        {slots.default?.()}
      </div>
    )
  },
})

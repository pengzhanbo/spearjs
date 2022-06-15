import type { WidgetGroupProp } from '@spearjs/shared'
import { defineComponent } from 'vue'
import type { PropType, InjectionKey } from 'vue'
import PropItem from './PropItem'

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
      <div>
        <h4>{props.config.label}</h4>
        {props.config.props.map((prop) => (
          <PropItem config={prop} injectKey={props.injectKey} />
        ))}
      </div>
    )
  },
})

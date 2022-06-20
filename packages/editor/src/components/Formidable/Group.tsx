import { ArrowRightBold } from '@element-plus/icons-vue'
import type { WidgetGroupProp } from '@spearjs/shared'
import { ElCollapseTransition, ElIcon } from 'element-plus'
import isBoolean from 'lodash-es/isBoolean'
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from './hooks'
import styles from './index.module.scss'
import PropItem from './PropItem'
import { tips } from './Tips'

export default defineComponent({
  name: 'FormidableGroupProp',
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
    const spread = ref(
      props.config.forgetSpread ? true : isBoolean(props.config.spread) ? props.config.spread : true
    )
    const handleClick = () => {
      if (props.config.forgetSpread) return
      spread.value = !spread.value
    }
    return () => (
      <div class={styles.groupWrapper}>
        <label class={styles.groupLabel} onClick={handleClick}>
          {tips(props.config.tips)}
          <span>{props.config.label}</span>
          <ElIcon>
            <ArrowRightBold class={[styles.groupIcon, { [styles.open]: spread.value }]} />
          </ElIcon>
        </label>
        <ElCollapseTransition>
          <div v-show={spread.value}>
            {props.config.props.map((prop) => (
              <PropItem config={prop} injectKey={props.injectKey} />
            ))}
          </div>
        </ElCollapseTransition>
      </div>
    )
  },
})

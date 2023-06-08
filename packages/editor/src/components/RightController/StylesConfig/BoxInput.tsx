import { stylesUnit } from '@editor/common'
import { ElInputNumber, ElOption, ElSelect } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  name: 'BoxInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
    modelValue: {
      type: String,
      default: '',
    },
    auto: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const inputRegExp = /^(-?\d+\.?\d+?)?(px|rem|%)?$/
    const input = ref<{ unit: string; number: number | undefined }>({
      unit: 'px',
      number: undefined,
    })
    const unitList = computed(() => {
      if (props.auto) {
        return [{ label: 'auto', value: 'auto' }, ...stylesUnit]
      } else {
        return stylesUnit
      }
    })
    watch(
      () => props.modelValue,
      (modelValue) => {
        if (!modelValue) {
          input.value = { unit: 'px', number: undefined }
        } else if (modelValue === '0') {
          input.value = { number: 0, unit: 'px' }
        } else if (modelValue === 'auto') {
          input.value = { number: 0, unit: 'auto' }
        } else {
          const [, number = 0, unit = 'px'] =
            modelValue.trim().match(inputRegExp) || []
          input.value = { number: Number(number), unit }
        }
      },
      { immediate: true },
    )
    watch(
      () => input.value,
      (input) => {
        if (input.unit === 'auto') {
          emit('update:modelValue', 'auto')
        } else if (input.number === 0) {
          emit('update:modelValue', '0')
        } else if (input.number === undefined) {
          emit('update:modelValue', '')
        } else {
          const { number, unit } = input
          emit('update:modelValue', `${number}${unit}`)
        }
      },
      { deep: true },
    )

    const options = computed(() => {
      const unit = input.value.unit
      return unit === 'px'
        ? { step: 0.1, precision: 1 }
        : unit === 'auto'
        ? { step: 1, precision: 0 }
        : { step: 0.001, precision: 3 }
    })

    const onBlur = (ev: Event) => {
      if ((ev.target as any).value === '') {
        input.value = { number: undefined, unit: 'px' }
      }
    }
    return () => (
      <div
        class={[
          styles.boxInputContainer,
          props.direction === 'vertical' ? styles.vertical : styles.horizontal,
        ]}
      >
        <ElInputNumber
          v-model={input.value.number}
          {...options.value}
          class={styles.boxInput}
          size="small"
          min={props.min}
          max={props.max}
          controlsPosition="right"
          placeholder={props.placeholder}
          disabled={input.value.unit === 'auto'}
          onBlur={onBlur}
        />
        <ElSelect
          class={styles.boxSelect}
          v-model={input.value.unit}
          size="small"
          suffixIcon=""
        >
          {unitList.value.map((item) => (
            <ElOption {...item} />
          ))}
        </ElSelect>
      </div>
    )
  },
})

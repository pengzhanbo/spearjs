import type { WidgetPropItem } from '@spearjs/shared'
import { isEmpty } from '@spearjs/shared'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { FormData } from './useFormData'

function setDotProp(
  model: Record<string, any>,
  dotKey: string,
  value?: any,
): void {
  const dotList = dotKey.split('.')
  const key = dotList.pop()!
  while (dotList.length) {
    const dot = dotList.shift()!
    model = model[dot]
  }
  model[key] = value
}
function getDotProp(model: Record<string, any>, dotKey: string): any {
  const dotList = dotKey.split('.')
  while (dotList.length) {
    const dot = dotList.shift()!
    model = model[dot]
  }
  return model
}

export const useDotProp = <T = any>(
  model: FormData,
  dotKey: ComputedRef<string>,
) => {
  const binding = computed<T>({
    set(data) {
      setDotProp(model.value, dotKey.value, data)
    },
    get() {
      return getDotProp(model.value, dotKey.value)
    },
  })

  return binding
}

export const useDotKey = (props: {
  dotKey: string
  config: WidgetPropItem
}) => {
  return computed(() => {
    const dotKey = props.dotKey
    return !isEmpty(dotKey) ? `${dotKey}.${props.config.key}` : props.config.key
  })
}

import { hasOwn, isArray } from '@spearjs/shared'
import type {
  WidgetGroupProp,
  WidgetPropItem,
  WidgetProps,
} from '@spearjs/shared'
import { isFunction } from 'lodash-es'

export function getDefaultValue(prop: WidgetPropItem): any {
  switch (prop.type) {
    case 'text':
    case 'radio':
      return prop.defaultValue || ''
    case 'number':
      return prop.defaultValue || prop.min || 0
    case 'select': {
      const multiple = hasOwn(prop, 'multiple') ? prop.multiple : false
      if (multiple) {
        return prop.defaultValue
          ? Array.isArray(prop.defaultValue)
            ? prop.defaultValue
            : [prop.defaultValue]
          : []
      } else {
        if (prop.defaultValue) return prop.defaultValue
        if (isFunction(prop.options) || !prop.options.length) return ''
        if ((prop.options[0] as any).options)
          return (prop.options[0] as any).options[0].value || ''
        return (prop.options[0] as any).value || ''
      }
    }
    case 'switch':
      return hasOwn(prop, 'defaultValue') ? prop.defaultValue : false
    case 'date':
      return prop.defaultValue || new Date()
    case 'checkbox':
      return prop.defaultValue || []
    case 'array':
      if (prop.defaultValue) return prop.defaultValue
      if (isArray(prop.items)) {
        return prop.items.map((item) => (item as any).defaultValue)
      } else {
        return new Array(prop.minLength || 0).fill(
          (prop.items as any).defaultValue,
        )
      }
    case 'object': {
      const obj = prop.defaultValue || {}
      prop.props.forEach((prop) => {
        obj[prop.key] = obj[prop.key] || getDefaultValue(prop)
      })
      return obj
    }
    default:
      return undefined
  }
}

export const createProps = (
  props: WidgetProps,
  result: Record<string, any> = Object.create({}),
): Record<string, any> => {
  props.forEach((prop: WidgetPropItem | WidgetGroupProp) => {
    if (prop.type === 'group') {
      createProps(prop.props, result)
    } else {
      result[prop.key] = getDefaultValue(prop)
    }
  })
  return result
}

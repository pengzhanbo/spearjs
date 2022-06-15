import { hasOwn, WidgetGroupProp } from '@spearjs/shared'
import type { WidgetPropItem, WidgetProps } from '@spearjs/shared'

export function getDefaultValue(prop: WidgetPropItem): any {
  switch (prop.type) {
    case 'text':
      return prop.defaultValue || ''
    case 'number':
      return prop.defaultValue || prop.min || 0
    case 'select':
      const multiple = hasOwn(prop, 'multiple') ? prop.multiple : false
      if (multiple) {
        return prop.defaultValue
          ? Array.isArray(prop.defaultValue)
            ? prop.defaultValue
            : [prop.defaultValue]
          : []
      } else {
        if (prop.defaultValue) return prop.defaultValue
        if (!prop.options.length) return ''
        if ((prop.options[0] as any).options) return (prop.options[0] as any).options[0].value || ''
        return (prop.options[0] as any).value || ''
      }
    case 'switch':
      return hasOwn(prop, 'defaultValue') ? prop.defaultValue : false
    case 'date':
      return prop.defaultValue || new Date()
    case 'array':
      return (
        prop.defaultValue || (hasOwn(prop.items, 'defaultValue') ? [prop.items.defaultValue] : [])
      )
    case 'object':
      const obj = {}
      prop.props.forEach((prop) => {
        obj[prop.key] = getDefaultValue(prop)
      })
      return obj
    default:
      return undefined
  }
}

export const createProps = (
  props: WidgetProps,
  result: Record<string, any> = {}
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

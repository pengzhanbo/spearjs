import type { WidgetProps } from '@spearjs/shared'

interface OptionsItem {
  value: string
  label: string
}

export const getPropSelectOptions = (
  props: WidgetProps,
  options: OptionsItem[] = [],
) => {
  props.forEach((prop) => {
    if (prop.type === 'group') {
      getPropSelectOptions(prop.props, options)
    } else {
      // todo props select options
    }
  })
}

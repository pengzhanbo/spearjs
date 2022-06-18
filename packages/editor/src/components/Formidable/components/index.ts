import type { WidgetPropsType } from '@spearjs/shared'
import type { DefineComponent } from 'vue'
import ArrayProp from './ArrayProp'
import ColorProp from './ColorProp'
import DateProp from './DateProp'
import NumberProp from './NumberProp'
import ObjectProp from './ObjectProp'
import SelectProp from './SelectProp'
import SwitchProp from './SwitchProp'
import TextProp from './TextProp'

export const components: Record<
  Exclude<WidgetPropsType, 'group'>,
  DefineComponent<any, any, any>
> = {
  text: TextProp,
  number: NumberProp,
  select: SelectProp,
  switch: SwitchProp,
  date: DateProp,
  color: ColorProp,
  array: ArrayProp,
  object: ObjectProp,
}

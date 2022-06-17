import TextProp from './TextProp'
import NumberProp from './NumberProp'
import SelectProp from './SelectProp'
import SwitchProp from './SwitchProp'
import ColorProp from './ColorProp'
import DateProp from './DateProp'
import ArrayProp from './ArrayProp'
import ObjectProp from './ObjectProp'
import type { WidgetPropsType } from '@spearjs/shared'
import type { DefineComponent } from 'vue'

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

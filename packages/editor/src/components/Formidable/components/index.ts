import type { WidgetPropsType } from '@spearjs/shared'
import type { DefineComponent } from 'vue'
import ArrayProp from './ArrayProp'
import BorderProp from './BorderProp'
import CheckboxProp from './CheckboxProp'
import ColorProp from './ColorProp'
import DateProp from './DateProp'
import NumberProp from './NumberProp'
import ObjectProp from './ObjectProp'
import RadioProp from './RadiosProp'
import RichTextProp from './RichTextProp'
import SelectProp from './SelectProp'
import SlideProp from './SlideProp'
import SwitchProp from './SwitchProp'
import TextProp from './TextProp'
import TextViewProp from './TextViewProp'

export const components: Record<
  Exclude<WidgetPropsType, 'group'>,
  DefineComponent<any, any, any>
> = {
  textView: TextViewProp,
  text: TextProp,
  number: NumberProp,
  select: SelectProp,
  switch: SwitchProp,
  radio: RadioProp,
  checkbox: CheckboxProp,
  date: DateProp,
  color: ColorProp,
  border: BorderProp,
  slider: SlideProp,
  richText: RichTextProp,
  array: ArrayProp,
  object: ObjectProp,
}

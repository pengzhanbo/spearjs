import type { DefineWidgetComponent } from '@editor/services/widget'
import type { AppBlock } from '@editor/stores'

export interface BlockItem extends Omit<AppBlock, 'component'> {
  label: string
  component: DefineWidgetComponent
}

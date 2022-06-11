import type { DefineWidgetComponent, AppBlock } from '@editor/services'

export interface BlockItem extends Omit<AppBlock, 'component'> {
  label: string
  component: DefineWidgetComponent
}

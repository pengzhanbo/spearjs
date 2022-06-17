import { ComponentWidget, WidgetComponentLayer } from '@spearjs/shared'
import type { CSSProperties } from 'vue'
import { createProps } from './createProps'

export interface AppBlockStyles {
  layer: CSSProperties
  custom: CSSProperties
}

export const createLayerStyles = (layer?: WidgetComponentLayer): CSSProperties => {
  return {
    display: layer?.display || 'block',
    zIndex: layer?.zIndex || 0,
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    padding: '0',
  }
}
export const createStyles = (widget: ComponentWidget) => {
  return {
    layer: createLayerStyles(widget.layer),
    custom: createProps(widget.styles || []),
  }
}

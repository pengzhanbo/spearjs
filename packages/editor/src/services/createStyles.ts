import type { ComponentWidget, WidgetComponentLayer } from '@spearjs/shared'

export type AppBlockStyles = WidgetComponentLayer

export const createLayerStyles = (layer: WidgetComponentLayer = {}): WidgetComponentLayer => {
  return Object.assign(
    {
      display: 'block',
      zIndex: 1,
      paddingTop: '',
      paddingRight: '',
      paddingBottom: '',
      paddingLeft: '',
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
      border: '',
      borderTop: '',
      borderRight: '',
      borderBottom: '',
      borderLeft: '',
      position: '',
      top: '',
      right: '',
      bottom: '',
      left: '',
      opacity: 1,
      width: '',
      height: '',
    } as WidgetComponentLayer,
    layer
  )
}

export const createStyles = (widget: ComponentWidget) => {
  return createLayerStyles(widget.layer)
}

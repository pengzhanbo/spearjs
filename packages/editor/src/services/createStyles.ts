import type { AppBlockStyles } from '@spearjs/core'
import type { ComponentWidget } from '@spearjs/shared'

export const createLayerStyles = (layer: AppBlockStyles = {}): AppBlockStyles => {
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
    } as AppBlockStyles,
    layer
  )
}

export const createStyles = (widget: ComponentWidget) => {
  return createLayerStyles(widget.layer)
}

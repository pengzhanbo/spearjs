export const enum WIDGET_DND_TYPE {
  Block = 'block',
  Component = 'component',
}

export const stylesPosition = [
  { label: '默认', value: '' },
  { label: '相对定位', value: 'relative' },
  { label: '绝对定位', value: 'absolute' },
  { label: '窗口定位', value: 'fixed' },
  { label: '粘性定位', value: 'sticky' },
]

export const stylesDisplay = [
  { label: '块', value: 'block' },
  { label: '行内块', value: 'inline-block' },
]

export const stylesUnit = [
  { label: 'px', value: 'px' },
  { label: 'rem', value: 'rem' },
  { label: '%', value: '%' },
]

export const stylesBorerStyle = [
  { label: '', value: '' },
  { label: 'none', value: 'none' },
  { label: 'solid', value: 'solid' },
  { label: 'dashed', value: 'dashed' },
  { label: 'dotted', value: 'dotted' },
  { label: 'double', value: 'double' },
  { label: 'groove', value: 'groove' },
  { label: 'ridge', value: 'ridge' },
  { label: 'inset', value: 'inset' },
  { label: 'outset', value: 'outset' },
]

export const actionTypeList = [
  { label: '组件', value: 'block' },
  { label: '全局', value: 'global' },
]

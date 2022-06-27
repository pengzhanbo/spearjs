import { registerWidget } from '@spearjs/shared'
import widgetConfig from 'spearjs/widget/config'
import editor from 'spearjs/widget/editor'
import render from 'spearjs/widget/render'

registerWidget({
  ...widgetConfig,
  ...editor,
  ...render,
})

import { registerWidget } from '@spearjs/shared'
import widgetConfig from 'spearjs/widget/config'
import render from 'spearjs/widget/render'

registerWidget({
  ...widgetConfig,
  ...render,
})

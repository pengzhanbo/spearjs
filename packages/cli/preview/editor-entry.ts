import description from 'spearjs/widget/description'
import editor from 'spearjs/widget/editor'
import render from 'spearjs/widget/render'
import widgetConfig from 'spearjs/widget/config'

const widget = {
  ...widgetConfig,
  description,
  editor,
  render,
}

// @ts-ignore
window.__spearjs_low_code__ = window.__spearjs_low_code__ || { widgetList: {} }

// @ts-ignore
window.__spearjs_low_code__.widgetList[widgetConfig.widgetId] = widget

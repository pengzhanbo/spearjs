/**
 * @type {import('@spearjs/shared').EditorConfigByComponent}
 */
export default {
  preview() {
    return <div>预览</div>
  },
  description() {
    return <div>组件使用说明</div>
  },
  layer: {
    display: 'inline-block',
  },
  props: [
    {
      key: 'text',
      label: '文本',
      type: 'text',
      defaultValue: '文本',
      tips: '文本',
      placeholder: '请输入文本',
    },
  ],
  expose: [
    {
      type: 'method',
      label: '点击',
      name: 'onClick',
      global: true,
    },
  ],
  actions: [
    {
      label: '点击事件',
      action: 'click',
      tips: '按钮点击事件',
    },
  ],
}

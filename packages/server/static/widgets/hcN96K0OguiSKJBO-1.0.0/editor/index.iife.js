!(function (e, t) {
  'use strict'
  var o = '_txt_x2pye_1'
  var r = '_txt_11kdq_1',
    a = e.defineEditorConfig({
      preview: () =>
        t.createVNode(t.Fragment, null, [
          t.createVNode('button', { class: r }, [t.createTextVNode('按钮')]),
        ]),
      description: () =>
        t.createVNode('div', { class: o }, [t.createTextVNode('这是一段文字描述')]),
      layer: { display: 'inline-block' },
      props: [{ type: 'text', key: 'text', label: '按钮文本', defaultValue: '按钮' }],
      actions: [],
      slots: [],
    })
  var n = '_txt_4t92l_1',
    i = e.defineRenderConfig({
      setup: () => ({ a: 1 }),
      render: ({ props: e }) => t.createVNode('button', t.mergeProps({ class: n }, e), [e.text]),
    })
  e.registerWidget({
    id: 'hcN96K0OguiSKJBO',
    version: '1.0.0',
    name: 'demo',
    platform: 'mobile',
    type: 'component',
    componentType: 'basis',
    componentSubType: 'vant',
    ...a,
    ...i,
  })
})(SpearjsShared, Vue)

!(function (e, t) {
  'use strict'
  var n = '_txt_4t92l_1',
    o = e.defineRenderConfig({
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
    ...o,
  })
})(SpearjsShared, Vue)

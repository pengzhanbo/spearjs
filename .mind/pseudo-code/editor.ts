export const editor = {
  // 属性配置
  props: [
    {
      name: 'check',
      type: String,
      form: {
        label: '',
        type: 'input',
        defaultValue: '',
        desc: '',
      },
    },
  ],
  // 样式配置
  styles: {},
  // 动作
  actions: {},

  // 暴露到外部的
  services: [
    {
      name: '',
      type: 'public | private',
      service: async () => {},
      paramModel: [],
      returnModel: [],
    },
  ],
  // 扩展应用
  enhance: ({ app, router }) => {},
  // preview 仅作为预览使用，是一个函数组件
  preview: () => {},

  // setup + props + render + name 会注册为一个 组件
  // setup 在 editor 中不会被执行，所以这个阶段的render是拿不到setup返回的内容的
  // 数据应该均在 props中定义描述，或者在render函数中定义并直接使用
  // 或者是在 services 中定义，作为私有类型，在 render函数中执行
  // setup可以用来
  setup() {
    // @ts-ignore
    if (__IS_EDITOR__) {
    }
    // @ts-ignore
    if (__IS_RENDER__) {
    }
  },
  render: ({ props, slots, actions, styles }) => {},
}
function getDefaultValue(type: any, defaultValue: any): any {
  if (type === String) {
    return defaultValue || ''
  }
  if (type === Object) {
    return defaultValue || {}
  }
  if (type === Array) {
    return defaultValue || []
  }
  if (type === Boolean) {
    return !!defaultValue
  }
  if (type === Function) {
    return defaultValue || (() => {})
  }
}

function createComponent(
  name: string,
  props: any[],
  setup: () => any | Promise<any>,
  render: (option: {
    props: any
    slots: any
    attrs: any
    actions: any
    styles: any
    expose: any
    emit: any
  }) => any
) {
  return {
    name,
    setup: async function (_props, { slots, attrs, expose, emit }) {
      const current = await setup()
      const data = {
        ...current,
      }

      props.forEach((prop) => {
        data[prop.name] = getDefaultValue(prop.type, prop.defaultValue)
      })
      const propsReactive = reactive(data)
      const actions = {}
      const styles = {}
      return render({ props: propsReactive, attrs, slots, actions, styles, expose, emit })
    },
  }
}
function reactive(data: {}) {
  throw new Error('Function not implemented.')
}

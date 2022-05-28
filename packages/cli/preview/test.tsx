import { defineComponent, Suspense, computed, ref } from 'vue'
import widget from './widget'

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
const components = {}
function createComponent({ id, version, name, setup, props, render }) {
  const key = `${id}-${version}`
  if (components[key]) return components[key]
  const currentProps = {}
  props.forEach((prop) => {
    currentProps[prop.name] = {
      type: prop.type,
      required: false,
      default: () => getDefaultValue(prop.type, prop.form.defaultValue),
    }
  })
  components[key] = {
    name,
    props: currentProps,
    setup: async function (_props, { slots, attrs, expose, emit }) {
      const current = (await setup(_props)) || {}
      const nowProps = computed(() => {
        return {
          ..._props,
          ...current,
        }
      })
      const actions = {}
      const styles = {}
      return () => render({ props: nowProps.value, attrs, slots, actions, styles, expose, emit })
    },
  }
  return components[key]
}

export default defineComponent({
  name: 'Test',
  setup() {
    const Widget = createComponent(widget)
    const message = ref(33)
    const handle = () => {
      message.value += 1
    }
    return () => (
      <>
        <div onClick={handle} style={{ 'cursor': 'pointer', 'user-select': 'none' }}>
          add
        </div>
        <Suspense>
          <Widget message={message.value}></Widget>
        </Suspense>
      </>
    )
  },
})

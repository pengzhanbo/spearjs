import { defineRenderConfig } from '@spearjs/shared'
import { ElInput } from 'element-plus'
import { ref } from 'vue'

export default defineRenderConfig({
  setup: (_, { expose }) => {
    const inputValue = ref('')

    expose({
      inputValue,
    })

    return { inputValue }
  },
  render({ props, action }) {
    return (
      <ElInput
        v-model={this.inputValue.value}
        {...props}
        onFocus={() => action('focus')}
        onBlur={() => action('blur')}
        onChange={() => action('change')}
        onInput={() => action('input')}
        onClear={() => action('clear')}
      />
    )
  },
})

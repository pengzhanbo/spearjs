import { defineComponent } from 'vue'
import Test from './test'

export default defineComponent({
  name: 'App',
  setup: () => {
    return () => (
      <>
        <div>111</div>
        <Test></Test>
      </>
    )
  },
})

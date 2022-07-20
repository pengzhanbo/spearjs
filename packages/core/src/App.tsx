import { defineComponent } from 'vue'
import { ApplicationView } from './renderer'

export default defineComponent({
  name: 'App',
  setup: () => {
    return () => <ApplicationView />
  },
})

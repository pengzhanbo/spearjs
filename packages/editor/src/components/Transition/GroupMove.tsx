import { defineComponent, TransitionGroup } from 'vue'

export default defineComponent({
  name: 'GroupMove',
  setup(props, { slots }) {
    const setStyle = (el: Element): void => {
      ;(el as HTMLElement).style.transition = `all 0.3s ease-in-out`
    }

    return () => (
      <TransitionGroup name="flip-list" appear onAppear={setStyle}>
        {slots.default?.()}
      </TransitionGroup>
    )
  },
})

import type { FunctionalComponent } from 'vue'

export const IconBase: FunctionalComponent<{
  viewBox?: string
}> = ({ viewBox = '0 0 512 512' }, { slots }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
    {slots.default?.()}
  </svg>
)

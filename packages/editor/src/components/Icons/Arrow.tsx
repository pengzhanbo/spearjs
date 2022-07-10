import type { FunctionalComponent } from 'vue'
import { IconBase } from './IconBase'

export const ArrowDoubleLeftIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 24 24">
    <path d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z" fill="currentColor"></path>
    <path d="M11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" fill="currentColor"></path>
  </IconBase>
)

export const ArrowDoubleRightIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 24 24">
    <path d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z" fill="currentColor"></path>
    <path d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" fill="currentColor"></path>
  </IconBase>
)

export const ArrowMiniRightIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 24 24">
    <path d="M8 5v14l11-7L8 5z" fill="currentColor"></path>
  </IconBase>
)

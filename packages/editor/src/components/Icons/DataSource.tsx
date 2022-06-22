import type { FunctionalComponent } from 'vue'
import { IconBase } from './IconBase'

export const DataSourceIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 24 24">
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
      <path d="M4 6v6a8 3 0 0 0 16 0V6"></path>
      <path d="M4 12v6a8 3 0 0 0 16 0v-6"></path>
    </g>
  </IconBase>
)

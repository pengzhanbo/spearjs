import type { FunctionalComponent } from 'vue'
import { IconBase } from './IconBase'

export const AddIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 512 512">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M256 112v288"
    ></path>
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M400 256H112"
    ></path>
  </IconBase>
)

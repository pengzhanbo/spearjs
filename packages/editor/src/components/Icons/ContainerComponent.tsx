import type { FunctionalComponent } from 'vue'
import { IconBase } from './IconBase'

export const ContainerComponentIcon: FunctionalComponent = () => (
  <IconBase viewBox="0 0 32 32">
    <path
      d="M17 13V6H8v16h16v-9zm-7-5h5v5h-5zm0 7h5v5h-5zm12 5h-5v-5h5z"
      fill="currentColor"
    ></path>
    <path d="M28 11h-9V2h9zm-7-2h5V4h-5z" fill="currentColor"></path>
    <path
      d="M28 20h-2v2h2v6H4v-6h2v-2H4a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2z"
      fill="currentColor"
    ></path>
    <circle cx="7" cy="25" r="1" fill="currentColor"></circle>
  </IconBase>
)

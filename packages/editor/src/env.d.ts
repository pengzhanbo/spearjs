/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:*' {
  const result: any
  export default result
}

declare module 'nprogress' {
  interface Settings {
    minimum: number
    easing: string
    positionUsing: string
    speed: number
    trickle: boolean
    trickleRate: number
    trickleSpeed: number
    showSpinner: boolean
    barSelector: string
    spinnerSelector: string
    parent: string
    template: string
  }
  const nprogress: {
    version: string
    status: null | number
    settings: Settings
    configure: (option: Partial<Settings>) => this
    start: () => this
    done: (force?: boolean) => this
    set: (step: number) => this
    inc: (step: number) => this
    trickle: () => this
  }
  export default nprogress
}

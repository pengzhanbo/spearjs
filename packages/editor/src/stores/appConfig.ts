import { defineStore } from 'pinia'

export const appConfigStore = defineStore('appConfig', {
  state: () => ({
    name: '',
    platform: '',
  }),
})

// stores/counter.js
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return { collapsed: false }
  },
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
})

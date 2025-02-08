// stores/counter.js
import { defineStore } from 'pinia'
import userApi from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      username: '',
      email: '',
      createdAt: '',
      id: ''
    }
  },
  actions: {
    async getUserInfo() {
      const res = await userApi.getUserInfo()
      if (res.success) {
        this.$state = {
          ...res.data
        }
      }
    }
  }
})

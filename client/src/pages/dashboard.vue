<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <el-card
        class="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-800">个人信息</h3>
            <el-button
              type="primary"
              @click="updateUserInfo"
              :icon="Refresh"
              circle
            />
          </div>
        </template>
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <div
              class="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <span class="text-3xl font-bold text-white">
                {{ userInfo.username?.[0]?.toUpperCase() }}
              </span>
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-medium text-gray-900">
                {{ userInfo.username }}
              </h4>
              <p class="text-gray-500">{{ userInfo.email }}</p>
            </div>
          </div>
          <el-divider />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <p class="text-sm text-gray-500">用户名</p>
              <p class="text-base font-medium">{{ userInfo.username }}</p>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">邮箱地址</p>
              <p class="text-base font-medium">{{ userInfo.email }}</p>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">注册时间</p>
              <p class="text-base font-medium">
                {{ userInfo.createdAt }}
              </p>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const userInfo = useUserStore()
console.log('🚀 ~ userInfo:', userInfo)
const error = ref('')

const updateUserInfo = () => {
  userInfo.getUserInfo()
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div
        v-if="loading"
        class="flex justify-center items-center min-h-[200px]"
      >
        <el-skeleton
          :rows="3"
          animated
        />
      </div>
      <el-result
        v-else-if="error"
        icon="error"
        :title="error"
        :sub-title="'获取用户信息失败'"
      >
        <template #extra>
          <el-button
            type="primary"
            @click="fetchUserInfo"
          >
            重试
          </el-button>
        </template>
      </el-result>
      <template v-else>
        <el-card
          class="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-800">个人信息</h3>
              <el-button
                type="primary"
                @click="fetchUserInfo"
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import userApi from '@/api/user'

const userInfo = ref({})
const loading = ref(true)
const error = ref('')

// 获取用户信息
const fetchUserInfo = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await userApi.getUserInfo()
    if (res.success) {
      userInfo.value = res.data
    } else {
      error.value = res.message || '获取用户信息失败'
    }
  } catch (err) {
    error.value = '网络错误，请稍后重试'
    console.error('获取用户信息失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

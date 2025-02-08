<template>
  <ElHeader class="header">
    <div class="flex-1"></div>
    <el-dropdown @command="handleCommand">
      <div class="avatar-container cursor-pointer flex items-center">
        <div
          class="avatar w-8 h-8 bg-gradient-to-r rounded-full flex items-center justify-center mr-2"
        >
          <span class="text-lg font-bold text-white">
            {{ userStore.username?.[0]?.toUpperCase() }}
          </span>
        </div>
        <span class="text-gray-700">{{ userStore.username }}</span>
        <el-icon class="ml-1"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile">个人信息</el-dropdown-item>
          <el-dropdown-item
            divided
            command="logout"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </ElHeader>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { logout } from '../../utils/auth'
import { useUserStore } from '@/store/user'
import { onBeforeMount } from 'vue'

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.getUserInfo()
})

const router = useRouter()

// 处理下拉菜单命令
const handleCommand = async (command) => {
  if (command === 'profile') {
    router.push('/dashboard')
  } else if (command === 'logout') {
    logout()
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  height: var(--el-menu-item-height);
  background-color: #fff;
  width: 100%;
  padding: 0 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.avatar-container {
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.3s;
  .avatar {
    background-color: #409eff;
  }

  &:hover {
    background-color: #f5f7fa;
  }
}
</style>

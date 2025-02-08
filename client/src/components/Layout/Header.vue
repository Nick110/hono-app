<template>
  <ElHeader class="header">
    <div class="flex-1"></div>
    <el-dropdown @command="handleCommand">
      <div class="avatar-container cursor-pointer flex items-center">
        <div
          class="avatar w-8 h-8 bg-gradient-to-r rounded-full flex items-center justify-center mr-2"
        >
          <span class="text-lg font-bold text-white">
            {{ userInfo.username?.[0]?.toUpperCase() }}
          </span>
        </div>
        <span class="text-gray-700">{{ userInfo.username }}</span>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import userApi from '@/api/user'
import authApi from '@/api/auth'
import { logout } from '../../utils/auth'

const router = useRouter()
const userInfo = ref({})

// 获取用户信息
const fetchUserInfo = async () => {
  const res = await userApi.getUserInfo()
  if (res.success) {
    userInfo.value = res.data
  }
}

// 处理下拉菜单命令
const handleCommand = async (command) => {
  if (command === 'profile') {
    router.push('/dashboard')
  } else if (command === 'logout') {
    logout()
  }
}

onMounted(() => {
  fetchUserInfo()
})
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

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- 动态光效背景 -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"
      ></div>
      <div
        class="absolute inset-0 animate-pulse opacity-30 bg-gradient-to-t from-blue-500/20 via-cyan-300/20 to-purple-500/20 blur-3xl"
      ></div>
      <!-- 添加浮动粒子效果 -->
      <div class="particles absolute inset-0"></div>
    </div>

    <div class="max-w-md w-full space-y-8 relative">
      <div class="transform transition-all duration-500 hover:scale-105">
        <h2
          class="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-text-glow"
        >
          {{ isLogin ? '登录账户' : '注册账户' }}
        </h2>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="mt-8 space-y-6 backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] transform transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="邮箱地址"
            :class="[
              'dark',
              'appearance-none relative block w-full h-12 border border-gray-600 bg-black/20 text-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-black/30'
            ]"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :class="[
              'dark',
              'appearance-none relative block w-full h-12 border border-gray-600 bg-black/20 text-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-black/30'
            ]"
          />
        </el-form-item>
        <el-form-item
          v-if="!isLogin"
          prop="confirmPassword"
        >
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="确认密码"
            :class="[
              'dark',
              'appearance-none relative block w-full h-12 border border-gray-600 bg-black/20 text-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-black/30'
            ]"
          />
        </el-form-item>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a
              href="#"
              @click.prevent="toggleAuthMode"
              class="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
            >
              {{ isLogin ? '没有账户？立即注册' : '已有账户？立即登录' }}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-button-glow"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ isLogin ? '登录' : '注册' }}
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/api/auth'

const router = useRouter()
const isLogin = ref(true)
const formRef = ref(null)
const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(value)) {
          callback(new Error('邮箱格式不正确，请使用有效的邮箱地址'))
        } else if (value.length > 50) {
          callback(new Error('邮箱长度不能超过50个字符'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  form.value = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

const register = async () => {
  const res = await authApi.register({
    email: form.value.email,
    password: form.value.password
  })
  if (!res.success) {
    ElMessage({
      type: 'error',
      message: res.message
    })
    return
  }
  ElMessage({
    type: 'success',
    message: '注册成功'
  })
  isLogin.value = true // 切换到登录模式
  form.value = {
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const login = async () => {
  const res = await authApi.login({
    email: form.value.email,
    password: form.value.password
  })
  if (!res.success) {
    ElMessage({
      type: 'error',
      message: res.message
    })
    return
  }
  localStorage.setItem('token', res.data.token)
  ElMessage({
    type: 'success',
    message: '登录成功'
  })
  router.push('/dashboard')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()

    if (!isLogin.value) {
      // 注册逻辑
      register()
    } else {
      // 登录逻辑
      login()
    }
  } catch (error) {
    ElMessage({
      message: error.message || '操作失败，请重试',
      type: 'error'
    })
    console.error('认证错误:', error)
  }
}

// 添加粒子效果
onMounted(() => {
  const particles = document.querySelector('.particles')
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.setProperty('--x', `${Math.random() * 100}%`)
    particle.style.setProperty('--y', `${Math.random() * 100}%`)
    particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`)
    particle.style.setProperty('--delay', `${Math.random() * 5}s`)
    particles.appendChild(particle)
  }
})
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes text-glow {
  0%,
  100% {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.7);
  }
}

.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
}

@keyframes button-glow {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.7);
  }
}

.animate-button-glow {
  animation: button-glow 3s ease-in-out infinite;
}

.particles {
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: float var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    transform: translate(100px, -100px);
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
}
:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
}
</style>

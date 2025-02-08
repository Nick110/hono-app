import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

console.log('🛫 当前环境 ===', import.meta.env.MODE)
console.log('🏈  baseURL ===', import.meta.env.VITE_BASE_URL)

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data?.code === 401) {
      ElMessage({
        type: 'error',
        message: response.data?.message || '未授权，请重新登录'
      })
      localStorage.removeItem('token')
      window.location.href = '/auth'
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    const { response } = error
    if (response) {
      // 根据状态码处理错误
      // 处理 JWT 相关错误
      if (response.status === 401) {
        ElMessage({
          type: 'error',
          message: response.data?.message || '未授权，请重新登录'
        })
        localStorage.removeItem('token')
        window.location.href = '/auth'
        return Promise.reject(error)
      }

      switch (response.status) {
        case 403:
          ElMessage({
            type: 'error',
            message: '拒绝访问'
          })
          break
        case 404:
          ElMessage({
            type: 'error',
            message: '请求的资源不存在'
          })
          break
        case 500:
          ElMessage({
            type: 'error',
            message: '服务器错误'
          })
          break
        default:
          ElMessage({
            type: 'error',
            message: response.data?.message || '请求失败'
          })
      }
    } else {
      ElMessage({
        type: 'error',
        message: '网络错误，请检查您的网络连接'
      })
    }
    return Promise.reject(error)
  }
)

export default instance

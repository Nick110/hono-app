import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

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
    return response.data
  },
  (error) => {
    const { response } = error
    if (response) {
      // 根据状态码处理错误
      switch (response.status) {
        case 401:
          ElMessage({
            type: 'error',
            message: '未授权，请重新登录'
          })
          // 可以在这里处理登出逻辑
          break
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

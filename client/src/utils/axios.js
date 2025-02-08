import { message } from 'ant-design-vue'
import Axios from 'axios'

const instance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000 // 请求超时 20s
})

console.log('当前环境===', import.meta.env.MODE)
console.log('baseURL===', import.meta.env.VITE_BASE_URL)

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (response) =>
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    response,
  (error) => Promise.reject(error)
)

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) =>
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    response,
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      message.error(`Code: ${code}, Message: ${msg}`)
      console.error('[Axios Error]', error.response)
    } else {
      message.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default instance

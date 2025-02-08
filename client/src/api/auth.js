import request from './axios'

// 用户认证相关 API
const authApi = {
  // 用户登录
  login: (data) => {
    return request({
      url: '/user/login',
      method: 'POST',
      data
    })
  },

  // 用户注册
  register: (data) => {
    return request({
      url: '/user/register',
      method: 'POST',
      data
    })
  }
}

export default authApi

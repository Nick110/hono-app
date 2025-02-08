import request from './axios'

const authApi = {
  // 用户登录
  login: (data) => {
    return request({
      url: '/auth/login',
      method: 'POST',
      data
    })
  },

  // 用户注册
  register: (data) => {
    return request({
      url: '/auth/register',
      method: 'POST',
      data
    })
  },

  logout: (data) => {
    return request({
      url: '/auth/logout',
      method: 'POST',
      data
    })
  }
}

export default authApi

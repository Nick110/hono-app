import request from './axios'

// 用户认证相关 API
const userApi = {
  // 获取当前用户信息
  getUserInfo: () => {
    return request({
      url: '/api/user/getUserInfo',
      method: 'GET'
    })
  }
}

export default userApi

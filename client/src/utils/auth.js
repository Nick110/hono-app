import authApi from '../api/auth'

/**
 * 退出登录
 */
export const logout = async () => {
  try {
    const res = await authApi.logout()
    if (res.success) {
      ElMessage({
        message: '退出登录成功',
        type: 'success'
      })
      localStorage.removeItem('token')
      window.location.href = '/auth'
    }
  } catch (error) {
    console.error('退出登录失败:', error)
    ElMessage({
      message: '退出登录失败',
      type: 'error'
    })
  }
}

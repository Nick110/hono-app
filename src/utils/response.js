/**
 * 统一响应格式封装
 */

// 成功响应
export const success = (data = null, message = '操作成功') => {
  return {
    success: true,
    code: 200,
    data,
    message
  }
}

// 失败响应
export const error = (message = '操作失败', code = 500, data = null) => {
  return {
    success: false,
    code,
    data,
    message
  }
}

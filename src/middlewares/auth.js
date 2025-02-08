import { jwt } from 'hono/jwt'
import UserModel from '../models/user.js'

// Token 验证中间件
export const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, message: '无效的 token', code: 401 })
  }

  const token = authHeader.split(' ')[1]
  try {
    // 解析用户名（JWT 头部不会加密，可以先解析）
    const [header, payload] = token.split('.')
    console.log('🚀 ~ authMiddleware ~ [header, payload]:', [header, payload])
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString())
    const { userId } = decodedPayload

    // 获取用户的专属 JWT 密钥
    const user = await UserModel.findById(userId)
    if (!user) {
      return c.json({ success: false, message: '用户不存在', code: 401 })
    }

    // 使用用户的专属密钥验证 token
    return jwt({
      secret: user.jwtSecret,
      cookie: false
    })(c, next)
  } catch (err) {
    return c.json({ success: false, message: '无效的 token', code: 401 })
  }
}

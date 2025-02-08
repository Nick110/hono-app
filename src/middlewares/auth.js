import { jwt } from 'hono/jwt'
import { error } from '../utils/response.js'

// JWT 密钥，确保与用户路由中使用的密钥一致
const JWT_SECRET = 'your-secret-key'

// 验证 JWT token 的中间件
export const authMiddleware = jwt({
  secret: JWT_SECRET,
  cookie: false
})

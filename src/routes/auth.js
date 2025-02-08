import { formatTimestamp } from '@/middlewares/time'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import crypto from 'crypto'
import { success, error } from '@/utils/response.js'
import UserModel from '@/models/user'
import { getRandomGradualColor } from '@/utils/utils.js'

const authRouter = new Hono()

// 用户注册
authRouter.post('/register', formatTimestamp(), async (c) => {
  try {
    const { email, password } = await c.req.json()

    // 验证邮箱是否已存在
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return c.json(error('该邮箱已被注册', 400))
    }

    // 密码加密
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    // 生成随机的渐变色值
    const randomColor = getRandomGradualColor()

    // 创建新用户
    const user = new UserModel({
      username: email.split('@')[0],
      email,
      password: hashedPassword,
      salt: salt,
      avatarBgColor: randomColor,
      createdAt: new Date().valueOf()
    })

    await user.save()

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user.toObject()
    return c.json(success(userWithoutPassword, '用户注册成功'))
  } catch (error) {
    console.error('用户注册错误:', error)
    return c.json(error('用户注册失败', 500))
  }
})

// 用户登录
authRouter.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    // 查找用户
    const user = await UserModel.findOne({ email })
    if (!user) {
      return c.json(error('用户不存在', 400))
    }

    // 使用保存的 salt 验证密码
    const hashedPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
      .toString('hex')
    if (hashedPassword !== user.password) {
      return c.json(error('密码错误', 400))
    }

    // 生成用户特定的 JWT 密钥（基于随机字符串）
    const jwtSecret = crypto.randomBytes(32).toString('hex') // 256-bit key
    user.jwtSecret = jwtSecret

    await user.save()

    // 使用用户专属的 JWT 密钥生成 token
    const token = await sign({ userId: user._id, email: user.email }, user.jwtSecret)

    // 返回用户信息和 token
    const { password: _, ...userWithoutPassword } = user.toObject()
    return c.json(success({ ...userWithoutPassword, token }, '登录成功'))
  } catch (error) {
    console.error('用户登录错误:', error)
    return c.json(error('登录失败', 500))
  }
})

// 用户退出登录
authRouter.post('/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json(error('无效的 token', 401))
    }

    const token = authHeader.split(' ')[1]

    // 从 token 中提取用户 ID
    const [header, payload] = token.split('.')
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString())
    const { userId } = decodedPayload

    // 清除用户的 jwtSecret
    await UserModel.findByIdAndUpdate(userId, {
      $unset: { jwtSecret: 1 }
    })

    return c.json(success(null, '退出登录成功'))
  } catch (err) {
    console.error('退出登录错误:', err)
    return c.json(error('退出登录失败', 500))
  }
})

export default authRouter

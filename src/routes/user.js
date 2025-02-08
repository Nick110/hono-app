import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import UserModel from '../models/user.js'
import { formatTimestamp } from '@/middlewares/time.js'
import crypto from 'crypto'
import { success, error } from '../utils/response.js'

// JWT 密钥
const JWT_SECRET = 'your-secret-key'

const userRouter = new Hono()

// 获取所有用户
userRouter.get('/getAllUsers', formatTimestamp('createdAt'), async (c) => {
  try {
    const users = await UserModel.find({}, { password: 0 })
    if (!users || users.length === 0) {
      return c.json(success([]))
    }
    return c.json(success(users))
  } catch (error) {
    console.error('获取用户列表错误:', error)
    return c.json(error('获取用户列表失败', 500))
  }
})

// 用户注册
userRouter.post('/register', formatTimestamp('createdAt'), async (c) => {
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

    // 创建新用户
    const user = new UserModel({
      username: email.split('@')[0],
      email,
      password: hashedPassword,
      salt: salt, // 保存 salt
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
userRouter.post('/login', async (c) => {
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

    // 生成 JWT token
    const token = await sign({ userId: user._id, email: user.email }, JWT_SECRET)

    // 返回用户信息和 token
    const { password: _, ...userWithoutPassword } = user.toObject()
    return c.json(success({ ...userWithoutPassword, token }, '登录成功'))
  } catch (error) {
    console.error('用户登录错误:', error)
    return c.json(error('登录失败', 500))
  }
})

export default userRouter

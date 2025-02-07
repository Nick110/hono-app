import { Hono } from 'hono'
import UserModel from '../models/user.js'
import { formatTimestamp } from '@/middlewares/time.js'

const userRouter = new Hono()

// 获取所有用户
userRouter.get('/getAllUsers', formatTimestamp('createdAt'), async (c) => {
  try {
    const users = await UserModel.find({}, { password: 0 })
    if (!users || users.length === 0) {
      return c.json([])
    }
    return c.json(users)
  } catch (error) {
    console.error('获取用户列表错误:', error)
    return c.json({ error: '获取用户列表失败', message: error.message }, 500)
  }
})

export default userRouter

import { Hono } from 'hono'
import UserModel from '../models/user.js'
import { formatTimestamp } from '@/middlewares/time.js'
import { success, error } from '../utils/response.js'

const userRouter = new Hono()

// 获取当前用户信息
userRouter.get('/getUserInfo', formatTimestamp(), async (c) => {
  try {
    const { userId } = c.get('jwtPayload')
    const user = await UserModel.findById(userId, { password: 0, salt: 0 })

    if (!user) {
      return c.json(error('用户不存在', 404))
    }

    return c.json(success(user))
  } catch (err) {
    console.error('获取当前用户信息错误:', err)
    return c.json(error('获取用户信息失败', 500))
  }
})

export default userRouter

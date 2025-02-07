import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import authorRouter from './routes/author.js'

// 创建 Hono 应用实例
const app = new Hono()

// 连接 MongoDB
mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err))

// 基础路由
app.get('/', (c) => c.text('Welcome to Hono'))

// 注册用户路由
app.route('/api/user', userRouter)
app.route('/api/author', authorRouter)

// 启动服务器
serve(
  {
    fetch: app.fetch,
    port: 3001
  },
  (info) => {
    console.log(`Server is running on port ${info.port}`)
  }
)

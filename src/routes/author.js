import { Hono } from 'hono'
import Author from '../models/author.js'

const authorRouter = new Hono()

// 分页查询作者列表
authorRouter.post('/getAuthors', async (c) => {
  try {
    const { name = '', pageNo = 1, pageSize = 10 } = await c.req.json()

    // 构建查询条件
    const query = {}
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }

    // 计算总数
    const total = await Author.countDocuments(query)

    // 查询数据
    const authors = await Author.find(query)
      .skip((parseInt(pageNo) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))

    return c.json({
      data: authors,
      total,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize)
    })
  } catch (error) {
    console.error('获取作者列表错误:', error)
    return c.json({ error: '获取作者列表失败', message: error.message }, 500)
  }
})

export default authorRouter

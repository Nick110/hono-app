import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

// 定义中间件，将指定时间字段转换为YYYY-MM-DD格式
export const formatTimestamp = (fieldNames = 'createdAt', pattern = 'YYYY-MM-DD') => {
  return async (c, next) => {
    await next()
    if (typeof fieldNames === 'string') {
      fieldNames = [fieldNames]
    }
    const response = await c.res.json()
    const { data } = response
    if (Array.isArray(data) && data.length) {
      const newResponse = data.map((item) => {
        Object.keys(item).forEach((key) => {
          if (fieldNames.includes(key) && item[key]) {
            item[key] = dayjs(item[key]).format(pattern)
          }
        })
        return item
      })
      c.res = c.json({ ...newResponse, data })
    } else if (!isEmpty(data)) {
      // console.log({ data })
      fieldNames.forEach((fieldName) => {
        if (data[fieldName]) {
          data[fieldName] = dayjs(data[fieldName]).format(pattern)
        }
      })
      c.res = c.json({ ...response, data })
    }
    return c.json(data)
  }
}

import dayjs from 'dayjs'

// 定义中间件，将指定时间字段转换为YYYY-MM-DD格式
export const formatTimestamp = (fieldNames, pattern = 'YYYY-MM-DD') => {
  return async (c, next) => {
    await next()
    if (typeof fieldNames === 'string') {
      fieldNames = [fieldNames]
    }
    const response = await c.res.json()
    if (Array.isArray(response) && response.length) {
      const newResponse = response.map((item) => {
        Object.keys(item).forEach((key) => {
          if (fieldNames.includes(key) && item[key]) {
            item[key] = dayjs(item[key]).format(pattern)
          }
        })
        return item
      })
      c.res = c.json(newResponse)
    }
    return c.json(response)
  }
}

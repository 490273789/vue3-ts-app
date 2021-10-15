/**
 * @description: 判断当前数据类型
 * @param {unknown} value
 * @return {string} 返回当前类型的字符串
 */
export const toRawType = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 判断数组
 */
export const isArray = Array.isArray

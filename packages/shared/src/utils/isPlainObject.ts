/**
 * Check if a value is plain object
 */
export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown
): val is T => Object.prototype.toString.call(val) === '[object Object]'

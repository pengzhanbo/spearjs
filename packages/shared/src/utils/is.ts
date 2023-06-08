const checkType = (arg: unknown): string => {
  return Object.prototype.toString.call(arg).slice(8, -1)
}

export const isArray = (val: unknown): val is any[] => Array.isArray(val)

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isObject = (val: unknown): val is object =>
  val !== null && typeof val === 'object'

export const isMap = (val: unknown): boolean => checkType(val) === 'Map'

export const isSet = (val: unknown): boolean => checkType(val) === 'Set'

export const isDate = (val: unknown): val is Date => val instanceof Date

export const isEmpty = (val: unknown): boolean =>
  val === undefined || val === '' || val === null

/**
 * Check if a value is plain object
 */
export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown,
): val is T => checkType(val) === 'Object'

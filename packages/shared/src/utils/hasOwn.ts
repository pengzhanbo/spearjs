export const hasOwn = (obj: object, key: string) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

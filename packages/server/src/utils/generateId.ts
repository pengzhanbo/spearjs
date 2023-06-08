import { customAlphabet } from 'nanoid'

const hashLetter =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const generateAppId = customAlphabet(hashLetter, 12)

export const generateWidgetId = customAlphabet(hashLetter, 16)

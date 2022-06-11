import { customAlphabet } from 'nanoid'

const LETTER_CHAR = 'abcdefghijklmnopqrstuvwxyz'
const NUMBER_CHAR = '1234567890'
const HASH_CHAR = '1234567890abcdef'

const letterId = customAlphabet(LETTER_CHAR, 8)
const numberId = customAlphabet(NUMBER_CHAR, 8)
const letterSortId = customAlphabet(LETTER_CHAR, 5)
const hashId = customAlphabet(HASH_CHAR, 8)

export const generateBid = () => `com_${letterId()}`

export const generateWidgetName = () => {
  const name = letterSortId()
  return `Widget${name[0].toUpperCase()}${name.slice(1)}`
}

export const generateBlockGroupKey = () => numberId()

export const generateHashId = () => hashId()

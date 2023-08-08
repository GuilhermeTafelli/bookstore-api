/**
 *
 * @param min
 * @param max
 * @returns a random number between *_min_* and *_max_* values
 */
const number = (min = Math.floor(99999), max = Math.ceil(0)) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 *
 * @param length
 * @returns a hexadecimal string
 */
const hex = (length = 8) => {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')
}

/**
 *
 * @param length @default 5
 * @returns a random alphabetic uppercase code
 */
const getCode = (length = 5) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ'
  let code = ''
  for (let i = 1; i <= length; i++) {
    code += alphabet[number() % alphabet.length]
  }

  return code
}

export const Random = {
  number,
  hex,
  code: getCode
}

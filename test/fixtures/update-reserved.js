
import SQL from '../..'

export const input = SQL`
  ${SQL.UPDATE('user', { name: 'abe', age: 42 })}
`

export const text = `
  UPDATE "user" SET (name, age) = ($1, $2)
`

export const values = [
  'abe',
  42,
]

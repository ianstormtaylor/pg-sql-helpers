
import SQL from '../..'

export const input = SQL`
  ${SQL.UPDATE('users', { name: 'abe', age: 42 })}
`

export const text = `
  UPDATE users SET (name, age) = ($1, $2)
`

export const values = [
  'abe',
  42,
]

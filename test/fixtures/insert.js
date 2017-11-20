
import SQL from '../..'

export const input = SQL`
  ${SQL.INSERT('users', { name: 'abe', age: 42 })}
`

export const text = `
  INSERT INTO users (name, age) VALUES ($1, $2)
`

export const values = [
  'abe',
  42,
]

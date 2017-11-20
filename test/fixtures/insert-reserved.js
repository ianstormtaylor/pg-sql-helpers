
import SQL from '../..'

export const input = SQL`
  ${SQL.INSERT('user', { name: 'abe', age: 42 })}
`

export const text = `
  INSERT INTO "user" (name, age) VALUES ($1, $2)
`

export const values = [
  'abe',
  42,
]


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.WHERE({ age: { lte: 42 }})}
`

export const text = `
  SELECT *
  FROM users
  WHERE age <= $1
`

export const values = [
  42,
]

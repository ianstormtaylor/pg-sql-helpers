
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.WHERE({ age: { gt: 21, lte: 42 }})}
`

export const text = `
  SELECT *
  FROM users
  WHERE age > $1 AND age <= $2
`

export const values = [
  21,
  42,
]


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.LIMIT(Infinity)}
`

export const text = `
  SELECT *
  FROM users
  LIMIT ALL
`

export const values = []


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.LIMIT(5)}
`

export const text = `
  SELECT *
  FROM users
  LIMIT 5
`

export const values = []

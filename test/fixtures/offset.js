
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.OFFSET(5)}
`

export const text = `
  SELECT *
  FROM users
  OFFSET 5
`

export const values = []

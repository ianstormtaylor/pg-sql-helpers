
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.OFFSET(0)}
`

export const text = `
  SELECT *
  FROM users
  OFFSET 0
`

export const values = []

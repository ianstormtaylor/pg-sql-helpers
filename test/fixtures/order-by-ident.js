
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.ORDER_BY('users', ['name', '-age'])}
`

export const text = `
  SELECT *
  FROM users
  ORDER BY users.name ASC NULLS LAST, users.age DESC NULLS LAST
`

export const values = []

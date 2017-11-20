
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.ORDER_BY(['name', '-age'])}
`

export const text = `
  SELECT *
  FROM users
  ORDER BY name ASC NULLS LAST, age DESC NULLS LAST
`

export const values = []

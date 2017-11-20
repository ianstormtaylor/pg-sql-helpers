
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM ${SQL.IDENT('users')}
`

export const text = `
  SELECT *
  FROM users
`

export const values = []

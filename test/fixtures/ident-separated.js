
import SQL from '../..'

export const input = SQL`
  SELECT ${SQL.IDENT('users.name')}
  FROM users
`

export const text = `
  SELECT users.name
  FROM users
`

export const values = []

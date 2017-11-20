
import SQL from '../..'

export const input = SQL`
  SELECT ${SQL.IDENT('users.group')}
  FROM users
`

export const text = `
  SELECT users."group"
  FROM users
`

export const values = []

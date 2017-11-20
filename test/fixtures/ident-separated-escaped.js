
import SQL from '../..'

export const input = SQL`
  SELECT ${SQL.IDENT('users.wei"rd')}
  FROM users
`

export const text = `
  SELECT users."wei""rd"
  FROM users
`

export const values = []

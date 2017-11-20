
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM ${SQL.IDENT('user')}
`

export const text = `
  SELECT *
  FROM "user"
`

export const values = []

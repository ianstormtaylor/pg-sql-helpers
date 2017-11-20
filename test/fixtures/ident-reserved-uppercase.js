
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM ${SQL.IDENT('USER')}
`

export const text = `
  SELECT *
  FROM "USER"
`

export const values = []


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM ${SQL.IDENT('wei"rd')}
`

export const text = `
  SELECT *
  FROM "wei""rd"
`

export const values = []


import SQL from '../..'

export const input = SQL.ROWS`
  SELECT *
  FROM users
  WHERE id = 1
`

export const text = `
  SELECT *
  FROM users
  WHERE id = 1
`

export const values = []

export const rowMode = 'array'

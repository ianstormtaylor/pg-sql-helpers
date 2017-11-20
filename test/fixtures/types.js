
import SQL from '../..'

export const input = SQL.TYPES({ test: true })`
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

export const types = { test: true }

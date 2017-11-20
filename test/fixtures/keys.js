
import SQL from '../..'

export const input = SQL`
  SELECT ${SQL.KEYS({ id: true, name: true })}
  FROM users
`

export const text = `
  SELECT id, name
  FROM users
`

export const values = []

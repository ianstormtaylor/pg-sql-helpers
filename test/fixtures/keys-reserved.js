
import SQL from '../..'

export const input = SQL`
  SELECT ${SQL.KEYS({ id: true, user: true })}
  FROM users
`

export const text = `
  SELECT id, "user"
  FROM users
`

export const values = []


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  WHERE id = 1
  ${SQL.AND({ name: 'john' })}
`

export const text = `
  SELECT *
  FROM users
  WHERE id = 1
  AND name = $1
`

export const values = [
  'john',
]


import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  WHERE id = 1
  ${SQL.OR('users', { name: 'john' })}
`

export const text = `
  SELECT *
  FROM users
  WHERE id = 1
  OR users.name = $1
`

export const values = [
  'john',
]

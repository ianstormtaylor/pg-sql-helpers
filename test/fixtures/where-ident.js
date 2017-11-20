
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.WHERE('users', { name: 'john' })}
`

export const text = `
  SELECT *
  FROM users
  WHERE users.name = $1
`

export const values = [
  'john',
]

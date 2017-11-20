
import SQL from '../..'

export const input = SQL`
  SELECT *
  FROM users
  ${SQL.LIMIT(null)}
`

export const text = `
  SELECT *
  FROM users
${'  '}
`

export const values = []


import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE('users', { name: 'john' })}
`

export const output = {
  text: `SELECT * FROM users WHERE "users"."name" = $1`,
  values: ['john'],
}

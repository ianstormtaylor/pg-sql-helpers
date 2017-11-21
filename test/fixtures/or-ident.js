
import { sql } from 'pg-sql'
import { OR } from '../..'

export const input = sql`
  SELECT *
  FROM users
  WHERE id = 1
  ${OR('users', { name: 'john' })}
`

export const output = {
  text: `SELECT * FROM users WHERE id = 1 OR "users"."name" = $1`,
  values: ['john'],
}


import { sql } from 'pg-sql'
import { KEYS } from '../..'

export const input = sql`
  SELECT ${KEYS('users', { id: true, name: true })}
  FROM users
`

export const output = {
  text: `SELECT "users"."id", "users"."name" FROM users`,
  values: [],
}

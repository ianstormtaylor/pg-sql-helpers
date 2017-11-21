
import { sql } from 'pg-sql'
import { KEYS } from '../..'

export const input = sql`
  SELECT ${KEYS('users', [{ id: 1, name: 1 }, { id: 2, name: 2 }])}
  FROM users
`

export const output = {
  text: `SELECT "users"."id", "users"."name" FROM users`,
  values: [],
}

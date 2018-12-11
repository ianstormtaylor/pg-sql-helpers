
import { sql } from 'pg-sql'
import { COLUMNS } from '../../lib'

export const input = sql`
  SELECT ${COLUMNS('users', ['id', 'name'])}
  FROM users
`

export const output = {
  text: `SELECT "users"."id", "users"."name" FROM users`,
  values: [],
}

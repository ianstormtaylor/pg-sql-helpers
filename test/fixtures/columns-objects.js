
import { sql } from 'pg-sql'
import { COLUMNS } from '../../lib'

export const input = sql`
  SELECT ${COLUMNS('users', [{ id: 1, name: 1 }, { id: 2, name: 2 }])}
  FROM users
`

export const output = {
  text: `SELECT "users"."id", "users"."name" FROM users`,
  values: [],
}

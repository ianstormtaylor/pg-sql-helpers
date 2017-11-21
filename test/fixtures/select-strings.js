
import { sql } from 'pg-sql'
import { SELECT } from '../..'

export const input = sql`
  ${SELECT('users', ['id', 'name'])}
  FROM users
`

export const output = {
  text: `SELECT "users"."id", "users"."name" FROM users`,
  values: [],
}

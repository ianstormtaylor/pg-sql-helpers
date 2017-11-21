
import { sql } from 'pg-sql'
import { ORDER_BY } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${ORDER_BY('users', ['name', '-age'])}
`

export const output = {
  text: `SELECT * FROM users ORDER BY "users"."name" ASC NULLS LAST, "users"."age" DESC NULLS LAST`,
  values: [],
}


import { sql } from 'pg-sql'
import { ORDER_BY } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${ORDER_BY(['name', '-age'])}
`

export const output = {
  text: `SELECT * FROM users ORDER BY "name" ASC NULLS LAST, "age" DESC NULLS LAST`,
  values: [],
}


import { sql } from 'pg-sql'
import { ORDER_BY } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${ORDER_BY([])}
`

export const output = {
  text: `SELECT * FROM users`,
  values: [],
}

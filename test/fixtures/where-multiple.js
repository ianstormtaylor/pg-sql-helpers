
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE({ age: { gt: 21, lte: 42 }})}
`

export const output = {
  text: `SELECT * FROM users WHERE "age" > $1 AND "age" <= $2`,
  values: [21, 42],
}

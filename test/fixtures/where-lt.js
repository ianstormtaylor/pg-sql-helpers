
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE({ age: { lt: 42 }})}
`

export const output = {
  text: `SELECT * FROM users WHERE "age" < $1`,
  values: [42],
}


import { sql } from 'pg-sql'
import { LIMIT } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${LIMIT(5)}
`

export const output = {
  text: `SELECT * FROM users LIMIT $1`,
  values: [5],
}


import { sql } from 'pg-sql'
import { LIMIT } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${LIMIT(null)}
`

export const output = {
  text: `SELECT * FROM users`,
  values: [],
}

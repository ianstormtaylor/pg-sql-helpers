
import { sql } from 'pg-sql'
import { OFFSET } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${OFFSET(null)}
`

export const output = {
  text: `SELECT * FROM users`,
  values: [],
}

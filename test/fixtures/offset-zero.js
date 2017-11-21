
import { sql } from 'pg-sql'
import { OFFSET } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${OFFSET(0)}
`

export const output = {
  text: `SELECT * FROM users OFFSET $1`,
  values: [0],
}

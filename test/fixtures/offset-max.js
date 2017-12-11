
import { sql } from 'pg-sql'
import { OFFSET } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${OFFSET(10, { max: 5 })}
`

export const output = {
  text: `SELECT * FROM users OFFSET $1`,
  values: [5],
}

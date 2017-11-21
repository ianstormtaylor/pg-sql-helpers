
import { sql } from 'pg-sql'
import { AND } from '../..'

export const input = sql`
  SELECT *
  FROM users
  WHERE id = 1
  ${AND({ name: 'john' })}
`

export const output = {
  text: `SELECT * FROM users WHERE id = 1 AND "name" = $1`,
  values: ['john'],
}

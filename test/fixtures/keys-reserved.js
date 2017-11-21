
import { sql } from 'pg-sql'
import { KEYS } from '../..'

export const input = sql`
  SELECT ${KEYS({ id: true, user: true })}
  FROM users
`

export const output = {
  text: `SELECT "id", "user" FROM users`,
  values: [],
}

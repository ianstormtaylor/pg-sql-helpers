
import { sql } from 'pg-sql'
import { KEYS } from '../..'

export const input = sql`
  SELECT ${KEYS({ id: true, name: true })}
  FROM users
`

export const output = {
  text: `SELECT "id", "name" FROM users`,
  values: [],
}


import { sql } from 'pg-sql'
import { COLUMNS } from '../../lib'

export const input = sql`
  SELECT ${COLUMNS({ id: true, name: true })}
  FROM users
`

export const output = {
  text: `SELECT "id", "name" FROM users`,
  values: [],
}

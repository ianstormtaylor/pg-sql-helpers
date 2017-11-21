
import { sql } from 'pg-sql'
import { SELECT } from '../..'

export const input = sql`
  ${SELECT({ id: true, name: true })}
  FROM users
`

export const output = {
  text: `SELECT "id", "name" FROM users`,
  values: [],
}

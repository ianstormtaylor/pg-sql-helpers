
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE({ name: { ne: null }})}
`

export const output = {
  text: `SELECT * FROM users WHERE "name" IS NOT NULL`,
  values: [],
}

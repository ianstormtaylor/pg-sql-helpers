
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE(undefined)}
`

export const output = {
  text: `SELECT * FROM users`,
  values: [],
}

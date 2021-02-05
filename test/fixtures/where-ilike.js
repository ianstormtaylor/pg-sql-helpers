
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE({ name: { ilike: '%ohnson' } })}
`

export const output = {
  text: `SELECT * FROM users WHERE "name" ILIKE $1`,
  values: ['%ohnson'],
}

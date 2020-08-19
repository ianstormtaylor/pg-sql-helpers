
import { sql } from 'pg-sql'
import { WHERE } from '../..'

export const input = sql`
  SELECT *
  FROM users
  ${WHERE({ name: { like: '%ohnson' } })}
`

export const output = {
  text: `SELECT * FROM users WHERE "name" LIKE $1`,
  values: ['%ohnson'],
}

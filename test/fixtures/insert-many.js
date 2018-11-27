
import { sql } from 'pg-sql'
import { INSERT } from '../..'

export const input = sql`
  ${INSERT('users', [
    { name: 'alice', age: 42 },
    { name: 'ben', age: 31 },
  ])}
`

export const output = {
  text: `INSERT INTO "users" ("age", "name") VALUES ($1, $2), ($3, $4)`,
  values: [42, 'alice', 31, 'ben'],
}


import { sql } from 'pg-sql'
import { INSERT } from '../..'

export const input = sql`
  ${INSERT('users', [
    { name: 'alice', age: 42 },
    { name: 'ben', age: 31 },
  ])}
`

export const output = {
  text: `INSERT INTO "users" ("name", "age") VALUES ($1, $2), ($3, $4)`,
  values: ['alice', 42, 'ben', 31],
}

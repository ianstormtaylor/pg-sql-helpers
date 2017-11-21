
import { sql } from 'pg-sql'
import { INSERT } from '../..'

export const input = sql`
  ${INSERT('user', { name: 'abe', age: 42 })}
`

export const output = {
  text: `INSERT INTO "user" ("name", "age") VALUES ($1, $2)`,
  values: ['abe', 42],
}

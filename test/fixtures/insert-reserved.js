
import { sql } from 'pg-sql'
import { INSERT } from '../..'

export const input = sql`
  ${INSERT('user', { name: 'abe', age: 42 })}
`

export const output = {
  text: `INSERT INTO "user" ("age", "name") VALUES ($1, $2)`,
  values: [42, 'abe'],
}

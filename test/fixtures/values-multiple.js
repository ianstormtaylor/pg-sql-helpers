
import { sql } from 'pg-sql'
import { VALUES } from '../..'

export const input = sql`
  ${VALUES([
    { name: 'abe', age: 42 },
    { name: 'george', age: 31 },
  ])}
`

export const output = {
  text: `VALUES ($1, $2), ($3, $4)`,
  values: [42, 'abe', 31, 'george'],
}

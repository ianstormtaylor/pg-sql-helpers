
import { sql } from 'pg-sql'
import { VALUES } from '../..'

export const input = sql`
  ${VALUES({ name: 'abe', age: 42 })}
`

export const output = {
  text: `VALUES ($1, $2)`,
  values: [42, 'abe'],
}

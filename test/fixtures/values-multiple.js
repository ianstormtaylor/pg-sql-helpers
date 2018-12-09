
import { sql } from 'pg-sql'
import { VALUES } from '../..'

export const input = sql`
  INSERT INTO users (age, name) 
  VALUES (${VALUES([
    { name: 'abe', age: 42 },
    { name: 'george', age: 31 },
  ])})
`

export const output = {
  text: `INSERT INTO users (age, name) VALUES ($1, $2), ($3, $4)`,
  values: [42, 'abe', 31, 'george'],
}

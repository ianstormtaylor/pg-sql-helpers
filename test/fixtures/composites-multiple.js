
import { sql } from 'pg-sql'
import { COMPOSITES } from '../..'

export const input = sql`
  ${COMPOSITES([{ name: 'jimmy', age: 42 }, { name: 'mary', age: 41 }])}
`

export const output = {
  text: `($1, $2), ($3, $4)`,
  values: [42, 'jimmy', 41, 'mary'],
}

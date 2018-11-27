
import { sql } from 'pg-sql'
import { SORT } from '../../lib'

export const input = sql`
  ${SORT('name')}
`

export const output = {
  text: `"name" ASC NULLS LAST`,
  values: [],
}


import is from 'is'
import isPlainObject from 'is-plain-object'
import { sql } from 'pg-sql'

/**
 * A map of operators shorthands to PostgreSQL operators.
 *
 * @type {Object}
 */

const WHERE_OPERATORS = {
  eq: '=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  ne: '!=',
  neq: '!=',
}

/**
 * Create a SQL "AND" clause, just like "WHERE".
 *
 * @param {String} ident
 * @param {Object} params
 * @param {Object} options
 */

function AND(ident, params, options = {}) {
  const query = WHERE(ident, params, { ...options, keyword: 'AND' })
  return query
}

/**
 * Create a SQL "INSERT" statement from a dictionary or list of `values`.
 *
 * @param {String} table
 * @param {Object|Array} value
 * @return {Object}
 */

function INSERT(table, values) {
  const query = sql`INSERT INTO ${sql.ident(table)} (${KEYS(values)}) VALUES (${VALUES(values)})`
  return query
}

/**
 * Create a list of escaped, literal SQL identifiers from the keys of an `object`.
 *
 * @param {Object} object
 * @return {String}
 */

function KEYS(object, options = {}) {
  const { delimiter = ', ' } = options

  if (Array.isArray(object)) {
    object = object[0]
  }

  if (typeof object !== 'object') {
    throw new Error(`The \`KEYS\` SQL helper must be passed an object or an array of objects, but you passed: ${object}`)
  }

  const keys = getDefinedKeys(object)
  const idents = keys.map(k => sql.ident(k))
  const query = sql`${sql.join(idents, delimiter)}`
  return query
}

/**
 * Create a literal SQL "LIMIT" string from `number`.
 *
 * @param {Number} number
 * @return {Mixed}
 */

function LIMIT(number) {
  if (number == null) return sql``

  const query = number === Infinity
    ? sql`LIMIT ALL`
    : sql`LIMIT ${number}`

  return query
}

/**
 * Create a literal SQL "OFFSET" string from `number`.
 *
 * @param {Number} number
 * @return {Mixed}
 */

function OFFSET(number) {
  if (number == null) return sql``
  const query = sql`OFFSET ${number}`
  return query
}

/**
 * Create a SQL "OR" clause, just like "WHERE".
 *
 * @param {String} ident
 * @param {Object} params
 * @param {Object} options
 */

function OR(ident, params, options = {}) {
  const query = WHERE(ident, params, { ...options, keyword: 'OR' })
  return query
}

/**
 * Create a literal SQL "ORDER BY" string from `params`.
 *
 * @param {Array} params
 * @return {Mixed}
 */

function ORDER_BY(ident, params) {
  if (Array.isArray(ident)) {
    params = ident
    ident = ''
  }

  if (!Array.isArray(params)) {
    throw new Error(`The \`ORDER_BY\` SQL helper must be passed an array of sorting parameters, but you passed: ${params}`)
  }

  const values = params.map((param) => {
    let asc = true

    if (param.startsWith('-')) {
      asc = false
      param = param.slice(1)
    }

    const id = ident ? sql`${sql.ident(ident)}.${sql.ident(param)}` : sql`${sql.ident(param)}`
    return sql`${id} ${sql.raw(asc ? 'ASC' : 'DESC')} NULLS LAST`
  })

  const query = sql`ORDER BY ${sql.join(values, ', ')}`
  return query
}

/**
 * Create a SQL "update" list of columns and values.
 *
 * @param {String} table
 * @param {Object|Array} values
 * @return {Object}
 */

function UPDATE(table, values) {
  if (is.object(table)) {
    values = table
    table = null
  }

  const id = table ? sql`${sql.ident(table)}` : sql``
  const query = sql`UPDATE ${id} SET (${KEYS(values)}) = (${VALUES(values)})`
  return query
}

/**
 * Create a list of placeholders for the values of an `object`.
 *
 * @param {Object} object
 * @return {String}
 */

function VALUES(object, options = {}) {
  const {
    delimiter = ', ',
    groupDelimiter = '), (',
  } = options

  if (!Array.isArray(object)) {
    object = [object]
  }

  const values = object.map((obj) => {
    if (!is.object(obj)) {
      throw new Error(`The \`VALUES\` SQL helper must be passed an object or an array of objects, but you passed: ${object}`)
    }

    const vals = getDefinedKeys(obj).map(k => sql`${obj[k]}`)
    return sql`${sql.join(vals, delimiter)}`
  })

  const query = sql`${sql.join(values, groupDelimiter)}`
  return query
}

/**
 * Create a SQL "where" clause with `params` and optional `ident`.
 *
 * @param {String} ident
 * @param {Object} params
 * @return {Object}
 */

function WHERE(ident, params, options = {}) {
  if (is.object(ident)) {
    params = ident
    ident = ''
  }

  if (params == null) {
    return sql``
  }

  function handle(keys, obj) {
    const key = keys[keys.length - 1]
    let value = obj[key]
    let operator = WHERE_OPERATORS[key] || '='

    if (isPlainObject(value)) {
      const ks = getDefinedKeys(value)
      if (ks.length === 0) return
      ks.forEach(k => handle([...keys, k], value))
      return
    }

    if (value === null) {
      value = sql.raw('NULL')
      if (operator === '=') operator = 'IS'
      if (operator === '!=') operator = 'IS NOT'
    }

    const ref = key in WHERE_OPERATORS ? keys.slice(0, -1).join('->') : keys.join('->')
    const id = ident ? sql`${sql.ident(ident)}.${sql.ident(ref)}` : sql`${sql.ident(ref)}`
    const clause = sql`${id} ${sql.raw(operator)} ${value}`
    clauses.push(clause)
  }

  const { keyword = 'WHERE', delimiter = 'AND' } = options
  const clauses = []

  getDefinedKeys(params).forEach((key) => {
    handle([key], params)
  })

  if (clauses.length === 0) {
    return sql``
  }

  const query = sql`${sql.raw(keyword)} ${sql.join(clauses, ` ${delimiter} `)}`
  return query
}

/**
 * Get the keys for an `object` that don't have undefined values.
 *
 * @param {Object} object
 * @return {Array}
 */

function getDefinedKeys(object) {
  return Object.keys(object).filter(k => object[k] !== undefined)
}

/**
 * Add lowercase aliases for convenience.
 */

const and = AND
const insert = INSERT
const keys = KEYS
const limit = LIMIT
const offset = OFFSET
const or = OR
const orderBy = ORDER_BY
const update = UPDATE
const values = VALUES
const where = WHERE

/**
 * Export.
 *
 * @type {Function}
 */

export {
  and, AND,
  insert, INSERT,
  keys, KEYS,
  limit, LIMIT,
  offset, OFFSET,
  or, OR,
  orderBy, ORDER_BY,
  update, UPDATE,
  values, VALUES,
  where, WHERE,
}

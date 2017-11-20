
import is from 'is'
import isPlainObject from 'is-plain-object'

import RESERVED_WORDS from './reserved-words'
import WHERE_OPERATORS from './where-operators'

/**
 * A PostgreSQL identifier matcher.
 *
 * @type {RegExp}
 */

const IS_IDENTIFIER = /^[a-z_][a-z_0-9]*$/i

/**
 * Special types.
 *
 * @type {Symbol}
 */

const KINDS = {
  JOIN: Symbol('JOIN'),
  QUERY: Symbol('QUERY'),
  PLACEHOLDER: Symbol('PLACEHOLDER'),
}

/**
 * A template tag that returns Postges-compatible query objects.
 *
 * @param {Array} strings
 * @param {Mixed} ...interpolations
 * @return {Object}
 */

function SQL(strings, ...interpolations) {
  let u = []
  let v = []

  strings.forEach((string, i) => {
    let int = interpolations[i]

    if (string !== '') {
      u.push(string)
    }

    if (int === undefined) {
      return
    }

    if (typeof int === 'function') {
      const ret = int()
      if (ret && ret.type == KINDS.QUERY) {
        int = ret
      } else if (ret && ret.type == KINDS.JOIN) {
        int = ret
      } else {
        return
      }
    }

    if (int && int.type === KINDS.QUERY) {
      int = JOIN([int])
    }

    if (int && int.type === KINDS.JOIN) {
      int.clauses.forEach((clause, j) => {
        if (j != 0) u.push(int.delimiter)
        u = u.concat(clause.unformatted)
        v = v.concat(clause.values)
      })
    }

    else {
      u.push(KINDS.PLACEHOLDER)
      v.push(int)
    }
  })

  let n = 1
  const t = u.reduce((memo, s) => {
    return s === KINDS.PLACEHOLDER ? `${memo}$${n++}` : `${memo}${s}`
  }, '')

  return {
    type: KINDS.QUERY,
    text: t,
    unformatted: u,
    values: v,
  }
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
 * Create an escaped, literal SQL identifier from `string`.
 *
 * @param {String} string
 * @return {String}
 */

function IDENT(string) {
  if (string === '') return

  const escaped = string
    .split('.')
    .map(v => IS_IDENTIFIER.test(v) ? v : escapeIdentifier(v))
    .map(v => RESERVED_WORDS.includes(v.toLowerCase()) ? `"${v}"` : v)
    .join('.')

  const query = LITERAL(escaped)
  return query
}

/**
 * Create a SQL "insert" list of columns and values.
 *
 * @param {String} ident
 * @param {Object|Array} value
 * @return {Object}
 */

function INSERT(ident, value) {
  if (is.object(ident)) {
    value = ident
    ident = ''
  }

  const query = SQL`INSERT INTO ${IDENT(ident)} (${KEYS(value)}) VALUES (${VALUES(value)})`
  return query
}

/**
 * Create a special "join" object for joining multiple SQL clauses.
 *
 * @param {Array} clauses
 * @param {String} delimiter (optional)
 * @return {Object}
 */

function JOIN(clauses = [], delimiter = ',') {
  return {
    type: KINDS.JOIN,
    clauses,
    delimiter,
  }
}

/**
 * Create a list of escaped, literal SQL identifiers from the keys of an `object`.
 *
 * @param {Object} object
 * @return {String}
 */

function KEYS(object) {
  if (Array.isArray(object)) {
    object = object[0]
  }

  if (typeof object !== 'object') {
    throw new Error(`The \`KEYS\` SQL helper must be passed an object or an array of objects, but you passed: ${object}`)
  }

  const keys = Object.keys(object).filter(k => object[k] !== undefined)
  const idents = keys.map(SQL.IDENT)
  const query = SQL`${JOIN(idents, ', ')}`
  return query
}

/**
 * Create a literal SQL "LIMIT" string from `number`.
 *
 * @param {Number} number
 * @return {Mixed}
 */

function LIMIT(number) {
  if (number == null) {
    return
  }

  if (!is.number(number)) {
    throw new Error(`The \`LIMIT\` SQL helper must be passed a number, but you passed: ${number}`)
  }

  const query = LITERAL(`LIMIT ${number === Infinity ? 'ALL' : number}`)
  return query
}

/**
 * Create an unescaped, literal SQL string from `string`.
 *
 * CAUTION: This will not be escaped, and it is dangerous to pass user input
 * directly into this method as it does not protect against SQL injections.
 *
 * @param {String} string
 * @return {Object}
 */

function LITERAL(string = '') {
  const query = SQL([string])
  return query
}

/**
 * Create a literal SQL "OFFSET" string from `number`.
 *
 * @param {Number} number
 * @return {Mixed}
 */

function OFFSET(number) {
  if (number == null) {
    return
  }

  if (!is.number(number)) {
    throw new Error(`The \`OFFSET\` SQL helper must be passed a number, but you passed: ${number}`)
  }

  const query = LITERAL(`OFFSET ${number}`)
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

    const id = ident ? `${ident}.${param}` : param
    return LITERAL(`${id} ${asc ? 'ASC' : 'DESC'} NULLS LAST`)
  })

  const query = SQL`ORDER BY ${JOIN(values, ', ')}`
  return query
}

/**
 * Create a template tag that will make a prepared SQL statement with `name`.
 *
 * @param {String} name
 * @return {Function}
 */

function PREPARE(name) {
  return (...args) => {
    const ret = SQL(...args)
    ret.name = name
    return ret
  }
}

/**
 * Create a SQL query with `rowMode: array` enabled.
 *
 * @param {Mixed} ...args
 * @return {Object}
 */

function ROWS(...args) {
  const ret = SQL(...args)
  ret.rowMode = 'array'
  return ret
}

/**
 * Create a SQL query with a custom set of `types` parsers.
 *
 * @param {Object} types
 * @return {Function}
 */

function TYPES(types) {
  return (...args) => {
    const ret = SQL(...args)
    ret.types = types
    return ret
  }
}

/**
 * Create a SQL "update" list of columns and values.
 *
 * @param {String} ident
 * @param {Object|Array} value
 * @return {Object}
 */

function UPDATE(ident, value) {
  if (is.object(ident)) {
    value = ident
    ident = ''
  }

  const query = SQL`UPDATE ${IDENT(ident)} SET (${KEYS(value)}) = (${VALUES(value)})`
  return query
}

/**
 * Create a list of placeholders for the values of an `object`.
 *
 * @param {Object} object
 * @return {String}
 */

function VALUES(object) {
  if (!Array.isArray(object)) {
    object = [object]
  }

  const values = object.map((obj) => {
    if (!is.object(obj)) {
      throw new Error(`The \`VALUES\` SQL helper must be passed an object or an array of objects, but you passed: ${object}`)
    }

    const vals = Object
      .keys(obj)
      .filter(k => obj[k] !== undefined)
      .map(k => SQL`${obj[k]}`)

    return SQL`${JOIN(vals, ', ')}`
  })

  const query = SQL`${JOIN(values, '), (')}`
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

  function handle(keys, obj) {
    const key = keys[keys.length - 1]
    let value = obj[key]
    let operator = WHERE_OPERATORS[key] || '='

    if (isPlainObject(value)) {
      const ks = getKeys(value)
      if (ks.length === 0) return
      ks.forEach(k => handle([...keys, k], value))
      return
    }

    if (value === null) {
      value = LITERAL('NULL')
      if (operator === '=') operator = 'IS'
      if (operator === '!=') operator = 'IS NOT'
    }

    const ref = key in WHERE_OPERATORS ? keys.slice(0, -1).join('->') : keys.join('->')
    const id = ident ? `${ident}.${ref}` : ref
    const clause = SQL`${IDENT(id)} ${LITERAL(operator)} ${value}`
    clauses.push(clause)
  }

  const { keyword = 'WHERE', delimiter = 'AND' } = options
  const clauses = []

  getKeys(params).forEach((key) => {
    handle([key], params)
  })

  if (clauses.length === 0) {
    return
  }

  const query = SQL`${LITERAL(keyword)} ${JOIN(clauses, ` ${delimiter} `)}`
  return query
}

/**
 * Escape a SQL identifier `string`.
 *
 * @param {String} string
 * @return {String}
 */

function escapeIdentifier(string) {
  let escaped = `"`

  for (const c of string) {
    if (c === `"`) {
      escaped += c + c
    } else {
      escaped += c
    }
  }

  escaped += `"`
  return escaped
}

/**
 * Get the keys for an `object` that don't have undefined values.
 *
 * @param {Object} object
 * @return {Array}
 */

function getKeys(object) {
  return Object.keys(object).filter(k => object[k] !== undefined)
}

/**
 * Attach the functions to the `SQL` function, for convenience.
 */

const and = SQL.and = SQL.AND = AND
const ident = SQL.ident = SQL.IDENT = IDENT
const insert = SQL.insert = SQL.INSERT = INSERT
const join = SQL.join = SQL.JOIN = JOIN
const keys = SQL.keys = SQL.KEYS = KEYS
const limit = SQL.limit = SQL.LIMIT = LIMIT
const literal = SQL.literal = SQL.LITERAL = LITERAL
const offset = SQL.offset = SQL.OFFSET = OFFSET
const or = SQL.or = SQL.OR = OR
const orderBy = SQL.orderBy = SQL.ORDER_BY = ORDER_BY
const prepare = SQL.prepare = SQL.PREPARE = PREPARE
const rows = SQL.rows = SQL.ROWS = ROWS
const types = SQL.types = SQL.TYPES = TYPES
const update = SQL.update = SQL.UPDATE = UPDATE
const values = SQL.values = SQL.VALUES = VALUES
const where = SQL.where = SQL.WHERE = WHERE

/**
 * Export.
 *
 * @type {Function}
 */

export default SQL

export {
  and, AND,
  ident, IDENT,
  insert, INSERT,
  join, JOIN,
  keys, KEYS,
  limit, LIMIT,
  literal, LITERAL,
  offset, OFFSET,
  or, OR,
  orderBy, ORDER_BY,
  prepare, PREPARE,
  rows, ROWS,
  types, TYPES,
  update, UPDATE,
  values, VALUES,
  where, WHERE,
}


### `0.2.1` — November 27, 2018

###### NEW

**Added the `COLUMN` and `SORT` helpers.** These are lower level than the existing `ORDER_BY` helper and can be useful when you need to construct more complex `ORDER BY` clauses from different tables.

```js
COLUMN('users', 'name')
// `"users"."name"`
```
```js
SORT('users', '-name')
// "users"."name" DESC NULLS LAST
```

### `0.2.0` — November 26, 2018

###### BREAKING

**The `VALUES` and `KEYS` helpers now always use alphabetical order.** Previously they respected the order of the object definition itself, but this is error prone, especially when inserting or updating multiple values at once.

###### NEW

**The `VALUES` helper will now error when multiple values have different columns.** Previously it would silently fail when Postgres errored out because of a column mismatch, or it would silently succeed but with corruped data if the columns didn't line up. Usually this is not an issue, since you're most often creating an array of inserts in a loop.

### `0.1.0` — November 21, 2017

:sparkles:
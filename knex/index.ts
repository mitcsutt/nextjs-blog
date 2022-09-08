import knex, { Knex } from 'knex'
import config from '../knexfile.js'

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */

let cached = global.pg
if (!cached) cached = global.pg = {}

export const getKnex = <TRecord extends {} = any, TResult = unknown[]>() => {
  if (!cached.instance) {
    cached.instance = knex<TRecord, TResult>(config)
  }
  return cached.instance as Knex<TRecord, TResult>
}
const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = loadEnvConfig('./', dev).combinedEnv

const config = {
    client: 'pg',
    connection: {
      host : PG_HOST,
      port : parseInt(PG_PORT),
      user : PG_USERNAME,
      password : PG_PASSWORD,
      database : PG_DATABASE
    },
    migrations: {
      directory: './api/migrations',
    },
    seeds: {
      directory: './api/seeds',
    },
};

module.exports = config

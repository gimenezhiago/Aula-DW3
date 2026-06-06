import pg from 'pg'

const { Client } = pg

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL não foi definida. Verifique o arquivo .env.')
}

export const client = new Client({
  connectionString
})

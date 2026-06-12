import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL não foi definida. Verifique o arquivo .env.')
}

const pool = new Pool({
  connectionString
})

export default pool

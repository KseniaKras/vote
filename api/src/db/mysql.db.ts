import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { config } from 'utils/config'

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function query<
  T extends RowDataPacket[] | ResultSetHeader,
  P extends unknown[] = unknown[],
>(sql: string, params?: P): Promise<T> {
  const [rows] = await pool.query<T>(sql, params)

  return rows
}

export default {
  pool,
  query,
}

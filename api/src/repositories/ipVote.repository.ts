import type { PoolConnection } from 'mysql2/promise'
import type { IpVoteModel } from 'models'

export const getIpCounter = async (
  db: PoolConnection,
  ip: string,
): Promise<IpVoteModel[]> => {
  const [ipRow] = await db.query<IpVoteModel[]>(
    'SELECT cnt, ip FROM ip_vote_counters WHERE ip = ?',
    [ip],
  )

  return ipRow
}

export const incrementIpCounter = async (
  db: PoolConnection,
  ip: string,
): Promise<void> => {
  await db.query('UPDATE ip_vote_counters SET cnt = cnt + 1 WHERE ip = ?', [ip])
}

export const createIpCounter = async (
  db: PoolConnection,
  ip: string,
): Promise<void> => {
  await db.query('INSERT INTO ip_vote_counters (ip, cnt) VALUES (?, 1)', [ip])
}

export default {
  getIpCounter,
  incrementIpCounter,
  createIpCounter,
}

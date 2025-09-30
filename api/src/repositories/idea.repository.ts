import type { PoolConnection } from 'mysql2/promise'
import { dbService } from 'db'

export const getList = async () => {
  return dbService.query('SELECT id, title, description, votes FROM ideas')
}

export const incrementIdeaVotes = async (
  db: PoolConnection,
  ideaId: number,
): Promise<void> => {
  await db.query('UPDATE ideas SET votes = votes + 1 WHERE id = ?', [ideaId])
}

export default {
  getList,
  incrementIdeaVotes,
}

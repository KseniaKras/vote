import type { PoolConnection } from 'mysql2/promise'
import type { VoteModel } from 'models'

export const getVoteByIdeaAndIp = async ({
  db,
  ideaId,
  ip,
}: {
  db: PoolConnection
  ideaId: number
  ip: string
}): Promise<VoteModel[]> => {
  const [rows] = await db.query<VoteModel[]>(
    'SELECT * FROM votes WHERE idea_id = ? AND ip = ?',
    [ideaId, ip],
  )

  return rows
}

export const insertVote = async ({
  db,
  ideaId,
  ip,
}: {
  db: PoolConnection
  ideaId: number
  ip: string
}): Promise<void> => {
  await db.query('INSERT INTO votes (idea_id, ip) VALUES (?, ?)', [ideaId, ip])
}

export default {
  getVoteByIdeaAndIp,
  insertVote,
}

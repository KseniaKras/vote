import { dbService } from 'db'
import ApiError from 'error/api.error'
import { ideaRepository, ipVoteRepository, voteRepository } from 'repositories'

const getIdeas = async () => {
  return ideaRepository.getList()
}

const addVote = async (ideaId: number, ip: string) => {
  const dbConnection = await dbService.pool.getConnection()
  try {
    await dbConnection.beginTransaction()

    const ipRow = await ipVoteRepository.getIpCounter(dbConnection, ip)

    if (ipRow && ipRow.length > 0 && ipRow[0].cnt >= 10) {
      await dbConnection.rollback()
      throw ApiError.conflict('Превышен лимит голосов с этого IP (10).')
    }

    const existingVote = await voteRepository.getVoteByIdeaAndIp({
      db: dbConnection,
      ideaId,
      ip,
    })

    if (existingVote.length > 0) {
      await dbConnection.rollback()
      throw ApiError.conflict('Вы уже голосовали за эту идею.')
    }

    await voteRepository.insertVote({ db: dbConnection, ideaId, ip })

    if (ipRow.length > 0) {
      await ipVoteRepository.incrementIpCounter(dbConnection, ip)
    } else {
      await ipVoteRepository.createIpCounter(dbConnection, ip)
    }

    await ideaRepository.incrementIdeaVotes(dbConnection, ideaId)

    await dbConnection.commit()

    return { success: true }
  } catch (err) {
    await dbConnection.rollback()
    throw err
  } finally {
    dbConnection.release()
  }
}

export default {
  getIdeas,
  addVote,
}

import ApiError from 'error/api.error'
import { ideaService } from 'services'
import type { AppKoaContext } from 'utils/types'
import { getClientIp } from 'utils/getClientIP'

const getIdeas = async (ctx: AppKoaContext) => {
  const ideaList = await ideaService.getIdeas()

  ctx.body = ideaList
}

interface IAddVoteBody {
  ideaId: number
}

const addVote = async (ctx: AppKoaContext<IAddVoteBody>) => {
  const { ideaId } = ctx.request.body

  if (!ideaId) {
    throw ApiError.badRequest('ideaId is required')
  }

  const ip = getClientIp(ctx)
  const result = await ideaService.addVote(ideaId, ip)

  ctx.body = result
}

export default {
  getIdeas,
  addVote,
}

import ApiError from 'error/api.error'
import { ideaService } from 'services'
import type { AppKoaContext } from 'utils/types'
import { getClientIp } from 'utils/getClientIP'

const getIdeas = async (ctx: AppKoaContext) => {
  const ideaList = await ideaService.getIdeas()

  ctx.body = { list: ideaList }
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
  
  await ideaService.addVote(ideaId, ip)

  const updatedIdeas = await ideaService.getIdeas()

  ctx.body = {
    success: true,
    list: updatedIdeas,
  }
}

export default {
  getIdeas,
  addVote,
}

import type { Next, Middleware } from 'koa'
import ApiError from 'error/api.error'
import type { AppKoaContext } from 'utils/types'
import { HttpStatusCode } from 'constants/http'

const errorHandler: Middleware<AppKoaContext> = async (ctx, next: Next) => {
  try {
    await next()
  } catch (err) {
    let status: number
    let message: string

    if (err instanceof ApiError) {
      status = err.status
      message = err.message
    } else {
      status = HttpStatusCode.INTERNAL_SERVER_ERROR
      message = (err as Error).message || 'Internal Server Error'
    }

    ctx.status = status
    ctx.body = { status, message }

    ctx.app.emit('error', err, ctx)
  }
}

export default errorHandler

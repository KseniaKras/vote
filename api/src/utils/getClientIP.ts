import type { Context } from 'koa'

export function getClientIp(ctx: Context): string {
  const xForwardedFor = ctx.headers['x-forwarded-for']

  if (xForwardedFor && typeof xForwardedFor === 'string') {
    const ips = xForwardedFor.split(',')
    const firstIP = ips[0]?.trim()

    if (firstIP) {
      return firstIP
    }
  }

  return ctx.ip
}

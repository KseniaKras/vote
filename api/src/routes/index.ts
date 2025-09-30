import Router from '@koa/router'

import ideaRouter from './idea.router'

const router = new Router({ prefix: '/api' })

router.get('/health', (ctx) => (ctx.status = 200))
router.use('/ideas', ideaRouter.routes())

export default router

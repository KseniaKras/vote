import Router from '@koa/router'
import { ideaController } from 'controllers'

const router = new Router()

router.get('/', ideaController.getIdeas)
router.post('/vote', ideaController.addVote)

export default router

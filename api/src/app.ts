import http from 'node:http'
import dotenv from 'dotenv'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import router from 'routes'
import { errorHandler } from 'middlewares'

import { AppKoa } from 'utils/types'
import { config } from 'utils/config'

dotenv.config()

const initKoa = () => {
  const app = new AppKoa()
  app.proxy = true

  app.use(cors({ credentials: true }))
  app.use(bodyParser())

  app.use(errorHandler)

  app.use(router.routes()).use(router.allowedMethods())

  return app
}

const app = initKoa()

;(async () => {
  const server = http.createServer(app.callback())

  server.listen(config.server.port, () => {
    console.log(`API server is listening on ${config.server.port}`)
  })
})()

export default app

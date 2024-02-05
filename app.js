import express from 'express'
import cors from 'cors'
import snf from 'simple-node-framework'

import {
  useAfterRoutes,
  useBeforeRoutes,
} from 'pack-backend-utils/middlewares/index.js'

import { useSnf } from './api/core/middlewares/useSnf.js'
import v1Modules from './api/routers/apiV1Router.js'

const { config, log } = snf.Singleton

const app = express()
app.use(cors(config.cors))
app.use(express.json())

useSnf(app)
useBeforeRoutes(app, config, log)

app.use(v1Modules)

useAfterRoutes(app, config)

export default app

import express from 'express'
import cors from 'cors'
import snf from 'simple-node-framework'

import { middlewares } from 'pack-backend-utils'

import v1Modules from './api/routers/apiV1Router.js'

const { config, log } = snf.Singleton

const app = express()
app.use(cors(config.cors))
app.use(express.json())

middlewares.hooks.useBeforeRoutes(app, config, log)

app.use(v1Modules)

middlewares.hooks.useAfterRoutes(app, config)

export default app

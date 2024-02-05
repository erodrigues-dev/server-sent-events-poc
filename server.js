import process from 'node:process'
import { promisify } from 'node:util'
import snf from 'simple-node-framework'

import app from './app.js'

const { config, log } = snf.Singleton

const PORT = config.port || 8090
const ENV = process.env.NODE_ENV || 'default'

const server = app.listen(PORT, () => {
  log.info('Server', `listening on port ${PORT} in [${ENV}] environment`)
})

const shutdownServer = async () => {
  log.info('Server', 'start gracefull shutdown')
  await promisify(server.close).bind(server)()
  log.info('Server', 'server is closed')
}

process.on('SIGINT', async () => {
  log.info('Server', 'server received a SIGINT signal')
  await shutdownServer()
})

process.on('SIGTERM', async () => {
  log.info('Server', 'server received a SIGTERM signal')
  await shutdownServer()
})

process.on('uncaughtException', async error => {
  log.error('Server', 'server received a uncaughtException', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    natural: {
      errorObj: {
        message: error.message,
      },
    },
  })
})

process.on('unhandledRejection', async error => {
  log.error('Server', 'server received a unhandledRejection', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    natural: {
      errorObj: {
        message: error.message,
      },
    },
  })
})

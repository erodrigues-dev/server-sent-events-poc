import { Router } from 'express'

import countRouter from '../modules/count/router.js'
import sampleRouter from '../modules/sample/router.js'

const router = new Router()

router.use('/api/v1', countRouter)
router.use('/api/v1', sampleRouter)

export default router

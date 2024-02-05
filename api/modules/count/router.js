import { Router } from 'express'
import { CountController } from './Controller.js'

const router = new Router()
const controller = new CountController()

router.get('/count/events', controller.count.bind(controller))
router.post('/count/events', controller.count.bind(controller))

export default router

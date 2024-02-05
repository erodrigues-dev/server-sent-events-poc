import { Router } from 'express'

const router = new Router()

router.post('/samples', (_req, res, next) => {
  res.json([{ id: 1 }, { id: 2 }])
  next()
})

router.post('/samples/2', (_req, res, next) => {
  throw new Error('qualquer coisa')
  next()
})

export default router
